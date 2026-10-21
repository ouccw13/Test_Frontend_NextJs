import { CartButton } from "@/components/shoppingcart/CartButton";
import { ProductListView } from "@/Features/product/views/ProductListView";

export default function Home() {
  return (
   <main className="min-h-screen bg-gray-50">

      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <span className="text-xl font-bold">My Shop</span>


          <CartButton />

        </div>

      </header>


      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <ProductListView />

      </div>

    </main>
  );
}
