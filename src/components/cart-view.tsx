"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export function CartView() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return <p className="text-muted-foreground">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">₹{item.price} each</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" aria-label={`Decrease ${item.name}`}
              onClick={() => setQuantity(item.id, item.quantity - 1)}>-</Button>
            <span aria-live="polite">{item.quantity}</span>
            <Button size="sm" variant="outline" aria-label={`Increase ${item.name}`}
              onClick={() => setQuantity(item.id, item.quantity + 1)}>+</Button>
            <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>Remove</Button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between pt-2">
        <p className="text-lg font-semibold">Total: ₹{total}</p>
        <Button variant="outline" onClick={clear}>Clear cart</Button>
        <div className="flex gap-2">
        <Button variant="outline" onClick={clear}>Clear cart</Button>
        <Button asChild><Link href="/checkout">Checkout</Link></Button>
      </div>
      </div>
    </div>
  );
}