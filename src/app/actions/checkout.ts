"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { orderSchema } from "@/lib/schemas/checkout";
import { products } from "@/lib/products";
import { addOrder } from "@/lib/orders";

export type ActionResult =
  | { success: true; message: string; orderId: string; total: number }
  | { success: false; message: string; fieldErrors?: Record<string, string[] | undefined> };

export async function placeOrder(input: unknown): Promise<ActionResult> {
  // 1. Never trust the client: validate again with the SAME schema
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const data = parsed.data;

  // 2. Server-only business rule (the client can't know this)
  if (data.pincode === "000000") {
    return {
      success: false,
      message: "We can't deliver to that PIN code.",
      fieldErrors: { pincode: ["We don't deliver to this PIN code"] },
    };
  }

  // 3. Recompute the total from trusted server data, ignoring any client prices
  let total = 0;
  let itemCount = 0;
  for (const item of data.items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return { success: false, message: "One of the items no longer exists." };
    }
    total += product.price * item.quantity;
    itemCount += item.quantity;
  }

  await new Promise((r) => setTimeout(r, 1200)); // simulate processing

  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
  addOrder({
    id: orderId,
    fullName: data.fullName,
    itemCount,
    total,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/checkout"); // refresh the recent-orders list
  return { success: true, message: "Order placed!", orderId, total };
}