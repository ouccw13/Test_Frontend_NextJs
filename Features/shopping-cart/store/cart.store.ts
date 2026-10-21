"use client";

import { create } from "zustand";
import { cartService } from "@/services/cart/cart-service";
import type { Cart } from "../models/cart.model";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  // addItem: (productId: string, quantity?: number) => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  fetchCart: async () => {
    try {
      set({ isLoading: true, error: null });

      const cart = await cartService.getCart();

      set({ cart });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "ไม่สามารถโหลดตะกร้าสินค้าได้",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId: string, quantity: number = 1) => {
    try {
      set({ isUpdating: true, error: null });

      const cart = await cartService.addItem({
        productId,
        quantity,
      });

      set({ cart });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "ไม่สามารถเพิ่มสินค้าลงตะกร้าได้";

      set({ error: message });
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      set({ isUpdating: true, error: null });

      if (quantity <= 0) {
        const cart = await cartService.removeItem(productId);
        set({ cart });
        return;
      }

      // const cart = await cartService.updateItemQuantity({productId, 
      //   quantity,
      // });
        const cart = await cartService.updateItemQuantity(productId, {quantity,
      });


      set({ cart });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "ไม่สามารถอัปเดตจำนวนสินค้าได้";

      set({ error: message });
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  removeItem: async (productId) => {
    try {
      set({ isUpdating: true, error: null });

      const cart = await cartService.removeItem(productId);

      set({ cart });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "ไม่สามารถลบสินค้าออกจากตะกร้าได้",
      });
    } finally {
      set({ isUpdating: false });
    }
  },
}));