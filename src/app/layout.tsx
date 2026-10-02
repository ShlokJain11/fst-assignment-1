import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { CartBadge } from "@/components/cart-badge";
import { StoreInitializer } from "@/components/store-initializer";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // change to your Vercel URL after deploying
  title: { default: "ShopLab", template: "%s | ShopLab" },
  description: "Accessible UI, Zustand state, and type-safe Server Actions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreInitializer />
          <header className="mx-auto flex max-w-3xl items-center justify-between p-8 pb-0">
            <Link href="/" className="text-2xl font-bold">ShopLab</Link>
            <div className="flex items-center gap-2">
              <CartBadge />
              <ModeToggle />
            </div>
          </header>
          {children}
        <Toaster richColors /> 
        </ThemeProvider>
      </body>
    </html>
  );
}