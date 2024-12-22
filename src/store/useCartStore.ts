// store/useCartStore.ts
import { create } from "zustand";
import { ApiService } from "@/services/api";

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
}

const api = ApiService.getInstance();

const initialCart = {
  id: 0,
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

export const useCartStore = create<CartState>()((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<Cart>("/Cart");
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message, cart: null });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: number, quantity: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<Cart>("/Cart", { productId, quantity });
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (productId: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.delete<Cart>(`/Cart/items/${productId}`);
      if (response.success) {
        if (response.data) {
          set({ cart: response.data });
        } else {
          set({ cart: initialCart });
        }
      }
    } catch (error: any) {
      set({ error: error.message });
      await api.get<Cart>("/Cart").then((response) => {
        if (response.success && response.data) {
          set({ cart: response.data });
        }
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateCartItem: async (productId: number, quantity: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.put<Cart>(`/Cart/items/${productId}`, {
        quantity,
      });
      if (response.success && response.data) {
        set({ cart: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
      await api.get<Cart>("/Cart").then((response) => {
        if (response.success && response.data) {
          set({ cart: response.data });
        }
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: () => {
    set({ cart: null, error: null });
  },
}));
