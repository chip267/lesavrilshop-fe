// app/(routes)/search/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import useProductStore, {
  ProductSortOption,
  type ProductFilterParams,
} from "@/store/useProductStore";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSheet from "@/components/filter/FilterSheet";

const DEFAULT_FILTERS: ProductFilterParams = {
  pageNumber: 1,
  pageSize: 12,
  isActive: true,
  sortBy: ProductSortOption.Newest,
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const {
    products,
    isLoading,
    searchProducts,
    currentFilters,
    updateFilters,
    pagination,
  } = useProductStore();

  // Refs to track previous values
  const prevSearchQuery = useRef<string | null>(null);
  const prevFilters = useRef<ProductFilterParams | null>(null);
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!searchQuery) return;

    const filtersChanged =
      JSON.stringify(currentFilters) !== JSON.stringify(prevFilters.current);
    const searchQueryChanged = searchQuery !== prevSearchQuery.current;
    const shouldFetch =
      !initialFetchDone.current || searchQueryChanged || filtersChanged;

    if (shouldFetch) {
      const searchFilters = {
        ...currentFilters,
        searchTerm: searchQuery,
      };
      searchProducts(searchFilters);

      // Update refs
      initialFetchDone.current = true;
      prevSearchQuery.current = searchQuery;
      prevFilters.current = { ...searchFilters };
    }
  }, [searchQuery, currentFilters, searchProducts]);

  const handleApplyFilters = (filters: ProductFilterParams) => {
    updateFilters({
      ...filters,
      searchTerm: searchQuery || undefined,
    });
  };

  if (!searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-medium mb-4">No Search Query</h1>
        <p className="text-gray-600">
          Please enter a search term to see results.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-2">
      <div className="flex px-6 justify-between mt-2">
        <div className="flex flex-col">
          <h1 className="text-[24px] tracking-wide capitalize">
            Search Results
          </h1>
          <p className="text-gray-600 mt-1">
            {isLoading
              ? "Searching..."
              : `Found ${pagination.totalItems} results for "${searchQuery}"`}
          </p>
        </div>
        <FilterSheet
          totalResults={pagination.totalItems}
          currentFilters={currentFilters}
          defaultFilters={DEFAULT_FILTERS}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      <ProductGrid products={products} isLoading={isLoading} />

      {pagination.hasNextPage && !isLoading && (
        <div className="flex justify-center mt-8 mb-12">
          <button
            onClick={() => {
              const nextPage = (currentFilters.pageNumber || 1) + 1;
              updateFilters({
                ...currentFilters,
                pageNumber: nextPage,
                searchTerm: searchQuery,
              });
            }}
            className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <h2 className="text-xl font-medium mb-3">No Results Found</h2>
          <p className="text-gray-600">
            We couldn't find any products matching your search.
          </p>
          <p className="text-gray-600 mt-1">
            Try using different keywords or filters.
          </p>
        </div>
      )}
    </div>
  );
}
