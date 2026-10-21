// import Image from "next/image";
import type { Product } from "@/Features/product/models/product.model";
import { AddToCartButton } from "@/components/shoppingcart/AddToCartButton";

interface ProductCardViewProps {
  product: Product;
}

export function ProductCardView({
  product,
}: ProductCardViewProps) {
  console.log('test product:', product.imageUrl)
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-square bg-gray-100">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            ไม่มีรูปสินค้า
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 min-h-12 font-semibold text-gray-900">
          {product.name}
        </h2>

        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-lg font-bold text-gray-900">
            ฿{product.price.toLocaleString("th-TH")}
          </p>

          <p
            className={`text-xs ${
              product.stockQuantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stockQuantity > 0
              ? `คงเหลือ ${product.stockQuantity} ชิ้น`
              : "สินค้าหมด"}
          </p>
        </div>

        <div className="mt-4">
          <AddToCartButton
            productId={ product.id }
            quantity={product.stockQuantity}
          />
        </div>
      </div>
    </article>
  );
}