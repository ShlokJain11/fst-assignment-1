import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name is too long"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(200, "Address is too long"),
  pincode: z.string().trim().regex(/^\d{6}$/, "PIN code must be 6 digits"),
  notes: z.string().trim().max(200, "Notes can be at most 200 characters").optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

// Server-side schema: form fields plus cart items (id + quantity only, never prices)
export const orderSchema = checkoutSchema.extend({
  items: z
    .array(z.object({ id: z.string(), quantity: z.number().int().min(1).max(10) }))
    .min(1, "Your cart is empty"),
});