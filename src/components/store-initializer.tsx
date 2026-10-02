"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export function StoreInitializer() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}