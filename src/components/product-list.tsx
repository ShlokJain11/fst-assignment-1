"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-store"; // 1. new import

type Props = {
  products: Product[];
  fetchedAt: string;
};

export function ProductList({ products, fetchedAt }: Props) {
  const [liked, setLiked] = useState<string[]>([]);
  const addItem = useCartStore((s) => s.addItem); // 2. new line, inside the component

  console.log(
    "[ProductList] rendering in:",
    typeof window === "undefined" ? "SERVER (SSR pass)" : "BROWSER"
  );

  const toggle = (id: string) =>
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section>
      <p className="mb-4 text-sm text-muted-foreground">
        Data fetched on server at: {fetchedAt} | Liked: {liked.length}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="font-semibold">₹{p.price}</span>
              {/* 3. wrap the buttons in a div and add the new one */}
              <div className="flex gap-2">
                <Button
                  variant={liked.includes(p.id) ? "default" : "outline"}
                  onClick={() => toggle(p.id)}
                  aria-pressed={liked.includes(p.id)}
                >
                  {liked.includes(p.id) ? "Liked" : "Like"}
                </Button>
                <Button onClick={() => addItem(p)}>Add to cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}