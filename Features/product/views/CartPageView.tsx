"use client";

import Image from "next/image";
import { useEffect,useState } from "react";
import { useCartStore } from "@/Features/shopping-cart/store/cart.store";
import type { CartItem } from "@/Features/shopping-cart/models/cart-item.model";
import Link from "next/link";
import { cartService } from '@/services/cart/cart-service'; 
import { Cart } from "@/Features/shopping-cart/models/cart.model";


function CartItemRow({
  item,
  isUpdating,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: CartItem;
  isUpdating: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}) {
  const itemTotal = item.unitPrice * item.quantity;

  const [cart, setCart] = useState<Cart | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadCart() {

      try {

        const cartId = localStorage.getItem('cartId');

        if (!cartId) {

          setLoading(false);

          return;

        }
        console.log('cartID: ', cartId)


        const data = await cartService.getCart(cartId);

        setCart(data);

      } catch (error) {

        console.error('Error loading cart:', error);

      } finally {

        setLoading(false);

      }

    }


    loadCart();

  }, []);

  return (
    
    <article className="flex gap-4 border-b border-gray-200 py-5">
        
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            ไม่มีรูป
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-semibold text-gray-900">
          {item.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          ฿{item.unitPrice.toLocaleString("th-TH")} / ชิ้น
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrease}
            disabled={isUpdating}
            className="h-8 w-8 rounded border border-gray-300 text-lg disabled:opacity-50"
            aria-label={`ลดจำนวน ${item.name}`}
          >
            −
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            disabled={isUpdating || item.quantity >= item.stock}
            className="h-8 w-8 rounded border border-gray-300 text-lg disabled:opacity-50"
            aria-label={`เพิ่มจำนวน ${item.name}`}
          >
            +
          </button>

          <button
            type="button"
            onClick={onRemove}
            disabled={isUpdating}
            className="ml-2 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            ลบสินค้า
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-900">
          ฿{itemTotal.toLocaleString("th-TH")}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          คงเหลือ {item.stock} ชิ้น
        </p>
      </div>
    </article>
  );
}

export function CartPageView() {
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);
  const isUpdating = useCartStore((state) => state.isUpdating);
  const error = useCartStore((state) => state.error);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        กำลังโหลดตะกร้าสินค้า...
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
    
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">

        <h1 className="text-xl font-bold text-gray-900">
          ตะกร้าสินค้าว่าง
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          เลือกสินค้าจากหน้าแรกเพื่อเพิ่มลงตะกร้า
        </p>
         <Link

          href="/"

          className="rounded-lg border border-gray-300  px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"

        >

          กลับไปเลือกสินค้า

        </Link>
      </div>
      
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            รายการสินค้าในตะกร้า
          </h1>

          <span className="text-sm text-gray-500">
            {cart.items.length} รายการ
          </span>
        </div>

        
    

        {error && (
          <p className="mb-3 rounded bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
    
        {cart.items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            isUpdating={isUpdating}
            onDecrease={() =>
              updateQuantity(item.productId, item.quantity - 1)
            }
            onIncrease={() =>
              updateQuantity(item.productId, item.quantity + 1)
            }
            onRemove={() => removeItem(item.productId)}
          />
        ))}
      </div>

      <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          สรุปคำสั่งซื้อ
        </h2>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">ราคาสินค้า</span>
            <span>฿{cart.subtotal.toLocaleString("th-TH")}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ส่วนลด</span>
            <span>-฿{cart.discount.toLocaleString("th-TH")}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ค่าจัดส่ง</span>
            <span>฿{cart.shippingFee.toLocaleString("th-TH")}</span>
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
            <span>ยอดรวม</span>
            <span>฿{cart.total.toLocaleString("th-TH")}</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
        >
          ดำเนินการสั่งซื้อ
        </button>
      </aside>
    </section>
  );
}