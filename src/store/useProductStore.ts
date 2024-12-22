import { create } from "zustand";
import { ApiService } from "@/services/api";

export interface ProductImage {
  id: number;
  imageUrl: string;
  isMain: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  parentCategoryId: number;
}

export interface Product {
  id: number;
  name: string;
  productDescription: string;
  deliveryDescription: string;
  ratingAverage: number;
  ratingQuantity: number;
  isActive: boolean;
  originalPrice: number;
  salePrice: number;
  quantityInStock: number;
  colors: string[];
  sizes: string[];
  categories: ProductCategory[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

// export interface ProductsResponse {
//   items: Product[];
//   pageNumber: number;
//   pageSize: number;
//   totalPages: number;
//   totalItems: number;
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
// }

// interface ProductState {
//   products: Product[];
//   isLoading: boolean;
//   error: string | null;
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     hasNextPage: boolean;
//     hasPreviousPage: boolean;
//   };
//   fetchProductsByCategory: (categoryId: number, page?: number) => Promise<void>;
// }

// const initialPagination = {
//   currentPage: 1,
//   totalPages: 1,
//   totalItems: 0,
//   hasNextPage: false,
//   hasPreviousPage: false,
// };

// const useProductStore = create<ProductState>((set, get) => ({
//   products: [],
//   isLoading: false,
//   error: null,
//   pagination: initialPagination,

//   fetchProductsByCategory: async (categoryId: number, page = 1) => {
//     set({ isLoading: true, error: null });
//     try {
//       const apiService = ApiService.getInstance();
//       const response = await apiService.get<ProductsResponse>(
//         `/Product/category/${categoryId}`,
//         {
//           page,
//           pageSize: 12, // Adjust as needed
//         }
//       );
//       console.log("response", response);

//       if (response.success && response.data) {
//         const {
//           items,
//           pageNumber,
//           totalPages,
//           totalItems,
//           hasNextPage,
//           hasPreviousPage,
//         } = response.data;
//         set({
//           products: items,
//           pagination: {
//             currentPage: pageNumber,
//             totalPages,
//             totalItems,
//             hasNextPage,
//             hasPreviousPage,
//           },
//         });
//       } else {
//         set({ error: response.message || "Failed to fetch products" });
//       }
//     } catch (error) {
//       set({ error: "Failed to fetch products" });
//       console.error("Error fetching products:", error);
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// export default useProductStore;
// store/useProductStore.ts

export interface PaginatedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export enum ProductSortOption {
  Newest = 0,
  PriceLowToHigh = 1,
  PriceHighToLow = 2,
  MostPopular = 3,
  BestRating = 4,
}

export interface ProductFilterParams {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  isActive?: boolean;
  sortBy?: ProductSortOption;
  pageNumber?: number;
  pageSize?: number;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  currentFilters: ProductFilterParams;
  fetchProductsByCategory: (
    categoryId: number,
    filters?: ProductFilterParams
  ) => Promise<void>;
  searchProducts: (filters: ProductFilterParams) => Promise<void>;
  updateFilters: (filters: ProductFilterParams) => void;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  currentFilters: {
    pageNumber: 1,
    pageSize: 12,
    isActive: true,
    sortBy: ProductSortOption.Newest,
  },

  fetchProductsByCategory: async (
    categoryId: number,
    filters?: ProductFilterParams
  ) => {
    set({ isLoading: true, error: null });
    try {
      const apiService = ApiService.getInstance();
      const currentFilters = filters || get().currentFilters;

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (currentFilters.searchTerm)
        queryParams.append("SearchTerm", currentFilters.searchTerm);
      if (currentFilters.minPrice)
        queryParams.append("MinPrice", currentFilters.minPrice.toString());
      if (currentFilters.maxPrice)
        queryParams.append("MaxPrice", currentFilters.maxPrice.toString());
      if (currentFilters.colors?.length)
        currentFilters.colors.forEach((color) =>
          queryParams.append("Colors", color)
        );
      if (currentFilters.sizes?.length)
        currentFilters.sizes.forEach((size) =>
          queryParams.append("Sizes", size)
        );
      if (currentFilters.sortBy)
        queryParams.append("SortBy", currentFilters.sortBy.toString());
      if (currentFilters.pageNumber)
        queryParams.append("PageNumber", currentFilters.pageNumber.toString());
      if (currentFilters.pageSize)
        queryParams.append("PageSize", currentFilters.pageSize.toString());
      if (currentFilters.isActive !== undefined)
        queryParams.append("IsActive", currentFilters.isActive.toString());

      const response = await apiService.get<PaginatedResult<Product>>(
        `/Product/category/${categoryId}?${queryParams.toString()}`
      );

      if (response.success && response.data) {
        const {
          items,
          pageNumber,
          totalPages,
          totalItems,
          hasNextPage,
          hasPreviousPage,
        } = response.data;
        set({
          products: items,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            totalItems,
            hasNextPage,
            hasPreviousPage,
          },
          currentFilters: {
            ...get().currentFilters,
            ...filters,
          },
        });
      } else {
        set({ error: response.message || "Failed to fetch products" });
      }
    } catch (error) {
      set({ error: "Failed to fetch products" });
      console.error("Error fetching products:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  searchProducts: async (filters: ProductFilterParams) => {
    set({ isLoading: true, error: null });
    try {
      const apiService = ApiService.getInstance();

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (filters.searchTerm)
        queryParams.append("SearchTerm", filters.searchTerm);
      if (filters.minPrice)
        queryParams.append("MinPrice", filters.minPrice.toString());
      if (filters.maxPrice)
        queryParams.append("MaxPrice", filters.maxPrice.toString());
      if (filters.colors?.length)
        filters.colors.forEach((color) => queryParams.append("Colors", color));
      if (filters.sizes?.length)
        filters.sizes.forEach((size) => queryParams.append("Sizes", size));
      if (filters.sortBy)
        queryParams.append("SortBy", filters.sortBy.toString());
      if (filters.pageNumber)
        queryParams.append("PageNumber", filters.pageNumber.toString());
      if (filters.pageSize)
        queryParams.append("PageSize", filters.pageSize.toString());
      if (filters.isActive !== undefined)
        queryParams.append("IsActive", filters.isActive.toString());

      const response = await apiService.get<PaginatedResult<Product>>(
        `/Product/search?${queryParams.toString()}`
      );

      if (response.success && response.data) {
        const {
          items,
          pageNumber,
          totalPages,
          totalItems,
          hasNextPage,
          hasPreviousPage,
        } = response.data;

        // If it's a new search (page 1), replace products
        // If it's pagination (page > 1), append products
        const newProducts =
          filters.pageNumber && filters.pageNumber > 1
            ? [...get().products, ...items]
            : items;

        set({
          products: newProducts,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            totalItems,
            hasNextPage,
            hasPreviousPage,
          },
          currentFilters: filters,
        });
      } else {
        set({ error: response.message || "Failed to fetch products" });
      }
    } catch (error) {
      set({ error: "Failed to fetch products" });
      console.error("Error fetching products:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateFilters: (filters: ProductFilterParams) => {
    set((state) => ({
      currentFilters: {
        ...state.currentFilters,
        ...filters,
        pageNumber: 1, // Reset to first page when filters change
      },
    }));
  },
}));

export default useProductStore;
