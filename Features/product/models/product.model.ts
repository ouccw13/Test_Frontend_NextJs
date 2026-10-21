export interface Product {
  id: string;
  productId?: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
