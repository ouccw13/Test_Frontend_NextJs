"use client";

import { ProductCardView } from "@/Features/product/views/ProductCardView";
import { useProductListViewModel } from "../viewmodels/useProductListViewModel";

export function ProductListView() {
  const { products, isLoading, error, reload } =
    useProductListViewModel();

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        กำลังโหลดสินค้า...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-700">เกิดข้อผิดพลาด: {error}</p>
        <button
          type="button"
          onClick={reload}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        ยังไม่มีรายการสินค้า
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          สินค้าทั้งหมด
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          พบสินค้า {products.length} รายการ
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCardView
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}