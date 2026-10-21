import { apiClient } from "@/services/api/api-client";
import type { Product } from "@/Features/product/models/product.model";

interface DotNetProductItem {
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

interface DotNetProductResponse {
  data: DotNetProductItem[];
}

const DOTNET_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log('BaseAPI: ', DOTNET_API_BASE_URL)
export const productService = {
   async getProducts(): Promise<Product[]> {

    const response = await apiClient<DotNetProductResponse>("/api/Products", {

      method: "GET",

    });
    return response.data.map((item) => ({
      id: item.id,
      productId: item.productId ?? item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stockQuantity: item.stockQuantity,
      category: item.category,
      imageUrl: item.imageUrl,
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))
  
    // return response.data.map((mapProduct));

  },


  // async getProductById(productId: string): Promise<Product> {

  //   const response = await apiClient<DotNetProductResponse>(

  //     `/api/Products/${productId}`,

  //     {

  //       method: "GET",

  //     },

  //   );


  //   // return mapProduct(response);

  // },
};