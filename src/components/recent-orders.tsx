import { getRecentOrders } from "@/lib/orders";
import { Skeleton } from "@/components/ui/skeleton";

export async function RecentOrders() {
  const orders = await getRecentOrders();

  if (orders.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {orders.map((o) => (
        <li key={o.id} className="flex justify-between rounded-lg border p-3 text-sm">
          <span>{o.id} · {o.fullName} · {o.itemCount} item(s)</span>
          <span className="font-medium">₹{o.total}</span>
        </li>
      ))}
    </ul>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading orders">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}