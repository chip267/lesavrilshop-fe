export interface Category {
  id: number;
  name: string;
  parentCategoryId: number | null;
  parentCategory: Category | null;
  subcategories: Category[];
  productCategories: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryState {
  categories: Category[];
  activeParentCategory: Category | null;
  activeSubCategory: Category | null;
  hoveredDetailCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  toggleParentCategory: (category: Category | null) => void;
  toggleSubCategory: (category: Category | null) => void;
  setHoveredDetailCategory: (category: Category | null) => void;
  resetCategories: () => void;
}
