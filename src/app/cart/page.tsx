import { CartView } from "@/components/cart-view";
export const metadata = { title: "Cart" };
export default function CartPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-8">
      <h2 className="text-xl font-semibold">Your cart</h2>
      <CartView />
    </main>
  );
}