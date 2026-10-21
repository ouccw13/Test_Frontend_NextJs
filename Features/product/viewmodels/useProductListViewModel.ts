"use client";

import { useCallback,useEffect, useState } from "react";
import { productService } from "@/services/product/product.service";
import type { Product } from "../models/product.model";

export function useProductListViewModel() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

   const loadProducts = useCallback(async () => {

    try {

      setIsLoading(true);

      setError(null);


      const data = await productService.getProducts();

      setProducts(data);

    } catch (error) {

      setError(

        error instanceof Error

          ? error.message

          : "ไม่สามารถโหลดรายการสินค้าได้",

      );

    } finally {

      setIsLoading(false);

    }

  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
        // If loadProducts returns a promise:
        await loadProducts();
    };

    fetchProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    reload: loadProducts,
  };
}