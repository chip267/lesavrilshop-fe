"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import FilterIcon from "@/components/ui/icons/FilterIcon";
import {
  FilterSection,
  ColorOption,
  SortOption,
  PriceOption,
  SizeOption,
} from "./FilterSection";
import {
  ProductSortOption,
  type ProductFilterParams,
} from "@/store/useProductStore";

interface FilterSheetProps {
  totalResults: number;
  currentFilters: ProductFilterParams;
  defaultFilters: ProductFilterParams;
  onApplyFilters: (filters: ProductFilterParams) => void;
}

const COLOR_OPTIONS = [
  { value: "White", label: "White", hex: "#FFFFFF" },
  { value: "Black", label: "Black", hex: "#000000" },
  { value: "Blue", label: "Blue", hex: "#1976D2" },
  { value: "Brown", label: "Brown", hex: "#795548" },
  { value: "Grey", label: "Grey", hex: "#9E9E9E" },
  { value: "Beige", label: "Beige", hex: "#F5E6D3" },
  { value: "Green", label: "Green", hex: "#388E3C" },
];

const SIZE_OPTIONS = ["XL", "32", "34", "36", "38", "40", "42", "44", "46"];

const PRICE_RANGES = [
  { max: 200000, label: "200.000₫" },
  { max: 500000, label: "500.000₫" },
  { max: 1000000, label: "1.000.000₫" },
  { max: 2000000, label: "2.000.000₫" },
];

const SORT_OPTIONS = [
  { label: "New In", value: ProductSortOption.Newest },
  { label: "Price low to high", value: ProductSortOption.PriceLowToHigh },
  { label: "Price high to low", value: ProductSortOption.PriceHighToLow },
];

const FilterSheet = ({
  totalResults,
  currentFilters,
  defaultFilters,
  onApplyFilters,
}: FilterSheetProps) => {
  const [localFilters, setLocalFilters] =
    React.useState<ProductFilterParams>(currentFilters);
  const [open, setOpen] = React.useState(false);
  const [openSections, setOpenSections] = React.useState({
    sort: true,
    color: true,
    size: true,
    price: true,
  });

  React.useEffect(() => {
    if (open) {
      setLocalFilters(currentFilters);
    }
  }, [open, currentFilters]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSortChange = (sortOption: ProductSortOption) => {
    setLocalFilters((prev) => ({
      ...prev,
      sortBy: sortOption,
    }));
  };

  const handleColorToggle = (color: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      colors: prev.colors?.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...(prev.colors || []), color],
    }));
  };

  const handleSizeToggle = (size: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      sizes: prev.sizes?.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...(prev.sizes || []), size],
    }));
  };

  const handlePriceSelect = (maxPrice: number) => {
    setLocalFilters((prev) => ({
      ...prev,
      maxPrice: prev.maxPrice === maxPrice ? undefined : maxPrice,
      minPrice: 0,
    }));
  };

  const clearFilters = () => {
    // Reset to default filters locally
    console.log({ ...defaultFilters });
    setLocalFilters({ ...defaultFilters });
  };

  const handleApply = () => {
    console.log(localFilters);
    onApplyFilters(localFilters);
    setOpen(false);
  };

  const hasActiveFilters = React.useMemo(() => {
    return (
      (localFilters.colors?.length ?? 0) > 0 ||
      (localFilters.sizes?.length ?? 0) > 0 ||
      localFilters.maxPrice !== undefined ||
      localFilters.sortBy !== defaultFilters.sortBy
    );
  }, [localFilters, defaultFilters.sortBy]);

  const totalActiveFilters = React.useMemo(() => {
    return (
      (localFilters.colors?.length ?? 0) + (localFilters.sizes?.length ?? 0)
    );
  }, [localFilters.colors, localFilters.sizes]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={`px-3 py-4 h-[36px] rounded-full shadow-none text-[12px] py-[10px] ${
            hasActiveFilters
              ? "bg-black text-white hover:bg-gray-900"
              : "border border-black bg-transparent text-black hover:bg-gray-100"
          }`}
        >
          <FilterIcon />
          Filters
          {totalActiveFilters > 0 && ` (${totalActiveFilters})`}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetTitle>Filters</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* Sort Section */}
            <FilterSection
              title="Sort by"
              isOpen={openSections.sort}
              onToggle={() => toggleSection("sort")}
            >
              <div className="flex flex-col gap-2">
                {SORT_OPTIONS.map(({ label, value }) => (
                  <SortOption
                    key={label}
                    label={label}
                    isSelected={localFilters.sortBy === value}
                    onClick={() => handleSortChange(value)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Color Section */}
            <FilterSection
              title="Colour"
              isOpen={openSections.color}
              onToggle={() => toggleSection("color")}
            >
              <div className="grid grid-cols-2 gap-2">
                {COLOR_OPTIONS.map(({ value, label, hex }) => (
                  <ColorOption
                    key={value}
                    color={hex}
                    label={label}
                    isSelected={localFilters.colors?.includes(value) ?? false}
                    onClick={() => handleColorToggle(value)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Size Section */}
            <FilterSection
              title="Size"
              isOpen={openSections.size}
              onToggle={() => toggleSection("size")}
            >
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((size) => (
                  <SizeOption
                    key={size}
                    size={size}
                    isSelected={localFilters.sizes?.includes(size) ?? false}
                    onClick={() => handleSizeToggle(size)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Price Section */}
            <FilterSection
              title="Price"
              isOpen={openSections.price}
              onToggle={() => toggleSection("price")}
            >
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map(({ max, label }) => (
                  <PriceOption
                    key={max}
                    price={max}
                    isSelected={localFilters.maxPrice === max}
                    onClick={() => handlePriceSelect(max)}
                  />
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col gap-3 mt-6 border-t pt-4">
            <Button variant="outline" onClick={clearFilters} className="w-full">
              CLEAR
            </Button>
            <Button
              onClick={handleApply}
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              SEE RESULTS ({totalResults})
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
