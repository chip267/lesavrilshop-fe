import { AuthService } from "@/services/auth.service";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

interface AuthResponse {
  success: boolean;
  token: string;
  message: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

const authService = new AuthService();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        if (response.success && response.data) {
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          return response.data;
        }
        throw new Error(response.message || "Login failed");
      },

      register: async (userData: RegisterData) => {
        const response = await authService.register(userData);
        if (response.success && response.data) {
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          return response.data;
        }
        throw new Error(response.message || "Registration failed");
      },

      logout: async () => {
        await authService.logout();
        // Clear the cart when logging out
        useCartStore.getState().clearCart();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
