"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function CartBadge() {
  // Selector returns a number, so this component re-renders only when the count changes
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  console.log("[CartBadge] render");

  return (
    <Button asChild variant="outline" size="sm" aria-label={`Cart, ${count} items`}>
      <Link href="/cart">
        <ShoppingCart className="mr-1 h-4 w-4" />
        {count}
      </Link>
    </Button>
  );
}