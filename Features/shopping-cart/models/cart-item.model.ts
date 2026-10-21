
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  stock: number;
}

export interface CartItemPayload {
  productId: string;
  quantity: number;
}