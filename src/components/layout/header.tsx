"use client";
import React, { useEffect, useRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import LoginPage from "@/app/(routes)/(auth)/login/page";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import { useRouter } from "next/navigation";
import useCategoryStore from "@/store/useCategoryStore";
import Cart from "@/app/(routes)/bag/page";
import SearchInput from "../search/SearchInput";
import Link from "next/link";

const Header = () => {
  const {
    categories,
    activeParentCategory,
    fetchCategories,
    toggleParentCategory,
    resetCategories,
  } = useCategoryStore();

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        resetCategories();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [resetCategories]);

  const formatUrlSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleCategoryClick = (category: any) => {
    toggleParentCategory(category);
  };

  const handleDetailedCategoryClick = (detailCategory: any) => {
    if (activeParentCategory) {
      const parentSlug = formatUrlSlug(activeParentCategory.name);
      const categorySlug = formatUrlSlug(detailCategory.name);
      router.push(`/${parentSlug}/${categorySlug}`);
      resetCategories();
    }
  };

  return (
    <div className="bg-background top-0 transition-all duration-300 fixed z-50 flex flex-col w-full px-4">
      <div className="flex items-center justify-between">
        <div className="py-5 flex items-center justify-center">
          <ToggleGroup type="single" className="gap-6">
            {categories.map((category) => (
              <ToggleGroupItem
                key={category.id}
                value={category.name.toLowerCase()}
                onClick={() => handleCategoryClick(category)}
                className="text-sm tracking-wider"
              >
                {category.name.toUpperCase()}
              </ToggleGroupItem>
            ))}
            <ToggleGroupItem value="teen">
              <div className="w-[69px] h-[21px] items-center justify-center">
                <img
                  src="/assets/images/img_logo_lsv_teen.png"
                  alt="BSK Teen Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Link href="/" className="mx-auto">
          <LogoIcon />
        </Link>

        <div className="flex gap-3 items-center">
          <SearchInput />
          <LoginPage />
          <Cart />
        </div>
      </div>

      {activeParentCategory && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg"
        >
          <div className="grid grid-cols-4 gap-6 p-6">
            {activeParentCategory.subcategories.map((subcat) => (
              <div key={subcat.id} className="flex flex-col gap-4">
                <h3 className="font-medium text-sm tracking-wide text-gray-400">
                  {subcat.name.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-2">
                  {subcat.subcategories.map((detailCat) => (
                    <button
                      key={detailCat.id}
                      onClick={() => handleDetailedCategoryClick(detailCat)}
                      className="text-left text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {detailCat.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
