"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import useProductStore, {
  type ProductFilterParams,
  ProductSortOption,
} from "@/store/useProductStore";
import useCategoryStore from "@/store/useCategoryStore";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSheet from "@/components/filter/FilterSheet";

const DEFAULT_FILTERS: ProductFilterParams = {
  pageNumber: 1,
  pageSize: 12,
  isActive: true,
  sortBy: ProductSortOption.Newest,
};

const formatUrlSlug = (name: string): string => {
  return name?.toLowerCase().replace(/\s+/g, "-") ?? "";
};

const CategoryPage = () => {
  const params = useParams();
  const {
    products,
    isLoading: productsLoading,
    fetchProductsByCategory,
    currentFilters,
    updateFilters,
    pagination,
  } = useProductStore();

  const {
    categories,
    isLoading: categoriesLoading,
    fetchCategories,
  } = useCategoryStore();

  // Refs to track previous values and prevent unnecessary fetches
  const initialFetchDone = useRef(false);
  const prevCategoryId = useRef<number | null>(null);
  const prevFilters = useRef<ProductFilterParams | null>(null);

  // Fetch categories if not available
  useEffect(() => {
    if (!categories.length && !categoriesLoading) {
      fetchCategories();
    }
  }, [categories.length, categoriesLoading, fetchCategories]);

  const category = useMemo(() => {
    if (!categories?.length) return null;

    const parentCategory = categories.find(
      (cat) => formatUrlSlug(cat.name) === params.gender
    );

    if (!parentCategory) return null;

    let foundCategory = null;
    parentCategory.subcategories?.forEach((subCat) => {
      subCat.subcategories?.forEach((detailCat) => {
        if (formatUrlSlug(detailCat.name) === params.category) {
          foundCategory = detailCat;
        }
      });
    });

    return foundCategory;
  }, [categories, params.gender, params.category]);

  // Fetch products when category is found and whenever filters change
  useEffect(() => {
    if (!category?.id) return;

    const filtersChanged =
      JSON.stringify(currentFilters) !== JSON.stringify(prevFilters.current);
    console.log("filtersChanged", filtersChanged);
    const categoryChanged = category.id !== prevCategoryId.current;
    const shouldFetch =
      !initialFetchDone.current || categoryChanged || filtersChanged;

    if (shouldFetch) {
      fetchProductsByCategory(category.id, currentFilters);
      initialFetchDone.current = true;
      prevCategoryId.current = category.id;
      prevFilters.current = { ...currentFilters };
    }
  }, [category?.id, currentFilters, fetchProductsByCategory]);

  const handleApplyFilters = (filters: ProductFilterParams) => {
    if (category?.id) {
      console.log("filters", filters);
      updateFilters(filters);
    }
  };

  // Show loading state while categories are being fetched
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Show 404 if category not found after categories have loaded
  if (!categoriesLoading && !category && categories.length > 0) {
    return notFound();
  }

  return (
    <div className="pt-2">
      {/* Category Header */}
      <div className="flex px-6 justify-between mt-4">
        <span className="text-[24px] tracking-wide capitalize">
          {category?.name || "Loading..."}
        </span>
        <FilterSheet
          totalResults={pagination.totalItems}
          currentFilters={currentFilters}
          defaultFilters={DEFAULT_FILTERS}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} isLoading={productsLoading} />

      {/* Load More Button */}
      {pagination.hasNextPage && (
        <div className="flex justify-center mt-8 mb-12">
          <button
            onClick={() => {
              const nextPage = (currentFilters.pageNumber || 1) + 1;
              updateFilters({ ...currentFilters, pageNumber: nextPage });
            }}
            className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
