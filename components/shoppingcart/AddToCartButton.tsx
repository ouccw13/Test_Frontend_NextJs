"use client";

import { useState } from "react";
import { useCartStore } from "@/Features/shopping-cart/store/cart.store";

interface AddToCartButtonProps {
  productId: string;
  quantity: number;
}

export function AddToCartButton({
  productId,
  quantity,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setMessage(null);

      await addItem(productId, quantity);

      setMessage("เพิ่มสินค้าลงตะกร้าแล้ว");
    } catch {
      setMessage("ไม่สามารถเพิ่มสินค้าลงตะกร้าได้");
    } finally {
      setIsAdding(false);
    }
  };

  if (quantity <= 0) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-500"
      >
        สินค้าหมด
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        // disabled={isAdding}
        className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAdding ? "กำลังเพิ่ม..." : "เพิ่มลงตะกร้า"}
      </button>

      {message && (
        <p className="mt-2 text-center text-xs text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}