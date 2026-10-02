import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { RecentOrders, OrdersSkeleton } from "@/components/recent-orders";

export const metadata = { title: "Checkout" };
export const dynamic = "force-dynamic"; // orders change, so don't prerender at build time

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <CheckoutForm />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Recent orders</h3>
        <Suspense fallback={<OrdersSkeleton />}>
          <RecentOrders />
        </Suspense>
      </section>
    </main>
  );
}