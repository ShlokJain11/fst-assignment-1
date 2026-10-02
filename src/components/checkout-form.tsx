"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { checkoutSchema, type CheckoutValues } from "@/lib/schemas/checkout";
import { placeOrder } from "@/app/actions/checkout";
import { useCartStore } from "@/store/cart-store";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema), // client-side validation
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", address: "", pincode: "", notes: "" },
  });

  async function onSubmit(values: CheckoutValues) {
    const result = await placeOrder({
      ...values,
      items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
    });

    if (result.success) {
      toast.success(`${result.message} ID: ${result.orderId}`);
      clear();
      reset();
      return;
    }

    // Map server-side field errors back onto the form
    if (result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0]) {
          setError(field as keyof CheckoutValues, { type: "server", message: messages[0] });
        }
      }
    }
    toast.error(result.message);
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground">Your cart is empty. Add some products first.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName}
          aria-describedby="fullName-error" {...register("fullName")} />
        <FieldError id="fullName-error" message={errors.fullName?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email}
          aria-describedby="email-error" {...register("email")} />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Mobile number</Label>
        <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national"
          aria-invalid={!!errors.phone} aria-describedby="phone-error" {...register("phone")} />
        <FieldError id="phone-error" message={errors.phone?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" autoComplete="street-address" aria-invalid={!!errors.address}
          aria-describedby="address-error" {...register("address")} />
        <FieldError id="address-error" message={errors.address?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pincode">PIN code</Label>
        <Input id="pincode" inputMode="numeric" autoComplete="postal-code"
          aria-invalid={!!errors.pincode} aria-describedby="pincode-error" {...register("pincode")} />
        <FieldError id="pincode-error" message={errors.pincode?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Delivery notes (optional)</Label>
        <Textarea id="notes" aria-invalid={!!errors.notes} aria-describedby="notes-error"
          {...register("notes")} />
        <FieldError id="notes-error" message={errors.notes?.message} />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-lg font-semibold">Total: ₹{total}</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Place order"}
        </Button>
      </div>
    </form>
  );
}