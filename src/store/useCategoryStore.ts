import { ApiService } from "@/services/api";
import { Category, CategoryState } from "@/types/category";
import { create } from "zustand";

const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  activeParentCategory: null,
  activeSubCategory: null,
  hoveredDetailCategory: null,
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const apiService = ApiService.getInstance();
      const response = await apiService.get<Category[]>("/Category");

      if (response.success && response.data) {
        const rootCategories = response.data.filter(
          (cat) => !cat.parentCategoryId
        );
        set({ categories: rootCategories });
      } else {
        set({ error: response.message || "Failed to fetch categories" });
      }
    } catch (error) {
      set({ error: "Failed to fetch categories" });
      console.error("Error fetching categories:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleParentCategory: (category) => {
    const currentActive = get().activeParentCategory;
    if (currentActive?.id === category?.id) {
      set({
        activeParentCategory: null,
        activeSubCategory: null,
        hoveredDetailCategory: null,
      });
    } else {
      set({
        activeParentCategory: category,
        activeSubCategory: null,
        hoveredDetailCategory: null,
      });
    }
  },

  toggleSubCategory: (category) => {
    const currentActive = get().activeSubCategory;
    if (currentActive?.id === category?.id) {
      set({
        activeSubCategory: null,
        hoveredDetailCategory: null,
      });
    } else {
      set({
        activeSubCategory: category,
        hoveredDetailCategory: null,
      });
    }
  },

  setHoveredDetailCategory: (category) => {
    set({ hoveredDetailCategory: category });
  },

  resetCategories: () => {
    set({
      activeParentCategory: null,
      activeSubCategory: null,
      hoveredDetailCategory: null,
    });
  },
}));

export default useCategoryStore;
