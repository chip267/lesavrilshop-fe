import { create } from "zustand";
import { ApiService } from "@/services/api";
import { AddressData } from "@/types/address";
import { ShippingMethod } from "@/services/shipping.service";

type PaymentMethod = "COD" | "Stripe";

interface CheckoutState {
  currentStep: "delivery" | "payment" | "summary";
  deliverySubStep: "method" | "address";
  shippingMethods: ShippingMethod[];
  selectedShippingMethod: ShippingMethod | null;
  userAddresses: AddressData[];
  selectedAddress: AddressData | null;
  selectedPaymentMethod: PaymentMethod | null;
  note: string;
  isLoading: boolean;
  error: string | null;

  fetchShippingMethods: () => Promise<void>;
  fetchUserAddresses: () => Promise<void>;
  setCurrentStep: (step: "delivery" | "payment" | "summary") => void;
  setDeliverySubStep: (subStep: "method" | "address") => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setAddress: (address: AddressData) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNote: (note: string) => void;
  submitOrder: () => Promise<number>;
  clearCheckout: () => void;
}

const api = ApiService.getInstance();

export const useCheckoutStore = create<CheckoutState>()((set, get) => ({
  currentStep: "delivery",
  deliverySubStep: "method",
  shippingMethods: [],
  selectedShippingMethod: null,
  userAddresses: [],
  selectedAddress: null,
  selectedPaymentMethod: null,
  note: "",
  isLoading: false,
  error: null,

  fetchShippingMethods: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<ShippingMethod[]>("/ShippingMethod");
      if (response.success && response.data) {
        set({ shippingMethods: response.data });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserAddresses: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<AddressData[]>("/Address");
      if (response.success && response.data) {
        set({ userAddresses: response.data });
        // Set default address if available
        const defaultAddress = response.data.find((addr) => addr.isDefault);
        if (defaultAddress && !get().selectedAddress) {
          set({ selectedAddress: defaultAddress });
        }
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  setDeliverySubStep: (subStep) => set({ deliverySubStep: subStep }),

  setShippingMethod: (method) =>
    set({
      selectedShippingMethod: method,
      deliverySubStep: "address",
    }),

  setAddress: (address) => set({ selectedAddress: address }),

  setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  setNote: (note) => set({ note }),

  submitOrder: async () => {
    const state = get();
    if (!state.selectedAddress || !state.selectedShippingMethod) {
      throw new Error("Missing required order information");
    }

    try {
      set({ isLoading: true, error: null });
      const orderData = {
        shippingAddressId: state.selectedAddress.id,
        shippingMethodId: state.selectedShippingMethod.id,
        paymentMethod: state.selectedPaymentMethod,
        note: state.note || undefined,
        couponId: null, // Add coupon handling if needed
      };

      const response = await api.post<{ id: number }>("/Orders", orderData);
      if (!response.success || !response.data) {
        throw new Error("Failed to create order");
      }

      return response.data.id;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCheckout: () =>
    set({
      currentStep: "delivery",
      deliverySubStep: "method",
      selectedShippingMethod: null,
      selectedAddress: null,
      selectedPaymentMethod: null,
      note: "",
      error: null,
    }),
}));
