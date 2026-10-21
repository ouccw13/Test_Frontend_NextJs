import type { CartItem } from "@/Features/shopping-cart/models/cart-item.model";

export interface Cart {
  id?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  updatedAt?: string;
}