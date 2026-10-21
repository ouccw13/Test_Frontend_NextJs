"use client";

import Link from "next/link";
import { useCartStore } from "@/Features/shopping-cart/store/cart.store";

export function CartButton() {
  const cart = useCartStore((state) => state.cart);

  const totalItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <Link
      href="/cart"
      aria-label={`ตะกร้าสินค้า มีสินค้า ${totalItems} ชิ้น`}
      className="relative inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
    >
      <span aria-hidden="true">ตะกร้า</span>
      <span>ตะกร้าสินค้า</span>

      {totalItems > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}