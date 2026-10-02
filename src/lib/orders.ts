export type Order = {
  id: string;
  fullName: string;
  itemCount: number;
  total: number;
  createdAt: string;
};

// globalThis keeps the array alive across hot reloads in dev
const g = globalThis as unknown as { __orders?: Order[] };
const orders: Order[] = (g.__orders ??= []);

export function addOrder(order: Order) {
  orders.unshift(order);
}

export async function getRecentOrders(): Promise<Order[]> {
  await new Promise((r) => setTimeout(r, 1500)); // simulate slow query so the skeleton is visible
  return orders.slice(0, 5);
}