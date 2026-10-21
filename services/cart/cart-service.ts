import { apiClient } from "@/services/api/api-client";
import type { Cart } from "@/Features/shopping-cart/models/cart.model";

interface AddCartItemRequest {

  productId: string;

  quantity: number;

}

interface UpdateCartItemRequest {

  quantity: number;

}


export const cartService = {

    async getCart(cartId?: string) {

    // if (!cartId) {

    //   throw new Error("Cart ID is required");

    // }


    const response = await fetch(`api/Cart/${cartId}`, {

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',

      },

    });


    if (!response.ok) {

      if (response.status === 404) {

        return null; // ถ้ายังไม่มีตะกร้า ให้คืนค่า null กลับไปจัดการต่อได้

      }

      throw new Error('Failed to fetch cart');

    }


    return response.json();

  },

  async addItem(payload: AddCartItemRequest): Promise<Cart> {
    console.log("กำลังส่งข้อมูลไป .NET API:", payload);
    return apiClient<Cart>("api/Cart/items", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // async getCart(cartId: string): Promise<Cart> {
  //   return apiClient<Cart>("`api/Cart/${cartId}`", {
  //     method: "GET",
  //   });
  // },

  async updateItemQuantity(
    productId: string,
    payLoad: UpdateCartItemRequest,
  ): Promise<Cart> {
    return apiClient<Cart>(`api/Cart/items/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(payLoad),
    });
  },

  async removeItem(productId: string): Promise<Cart> {
    return apiClient<Cart>(`api/Cart/items/${productId}`, {
      method: "DELETE",
    });
  },
};