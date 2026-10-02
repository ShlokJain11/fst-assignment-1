# ShopLab

A Next.js App Router project built for the Full Stack Development assignment: **Responsive Accessible Component Architecture, Client State Management & End-to-End Type-Safe Form Mutations**.

It combines accessible UI primitives, a persistent client-side cart, and a checkout form validated by one shared Zod schema on both the client and the server.

**Author:** Shlok Shrenik Jain
**Course outcomes covered:** CO1, CO2

---

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui built on Radix UI |
| Theming | next-themes (light / dark / system) |
| Client state | Zustand with `persist` middleware |
| Forms | react-hook-form, @hookform/resolvers |
| Validation | Zod (shared client + server schema) |
| Notifications | Sonner toasts |
| Icons | lucide-react |

---

## Features

### Part A: Accessible primitives and hydration boundaries
- shadcn/ui components (Button, Card, DropdownMenu, Input, Label, Textarea, Skeleton, Sonner) backed by Radix UI primitives
- Light, dark, and system theme switching with next-themes, with no flash of the wrong theme and no hydration warnings
- Theme icons swap using CSS `dark:` classes instead of JavaScript state, so server and client HTML always match
- A Server vs Client Component demo showing:
  - Server Components that log only in the terminal
  - Client Components hydrated in the browser
  - Serializable props crossing the boundary
  - A Server Component passed as `children` into a Client Component

### Part B: Zustand client state
- A persistent cart store (`localStorage`) with add, remove, quantity change, and clear
- Selector-based subscriptions, so the header cart badge re-renders only when the item count changes
- `layout.tsx` stays a Server Component, with small client islands inside it
- `skipHydration` plus manual rehydration after mount, which prevents server/client mismatches

### Part C: Type-safe Server Action form
- Checkout form built with react-hook-form and `zodResolver` for inline client validation
- The same Zod schema is re-validated inside a `"use server"` Server Action
- The server recalculates the order total from its own product data and ignores client prices
- Server field errors are mapped back onto form fields
- Accessible errors: linked labels, `aria-invalid`, `aria-describedby`, `role="alert"`
- Loading skeleton with React `<Suspense>` for the recent orders list
- Success and error toasts, plus a disabled submit button while pending

### Performance and sharing
- Dynamic Open Graph image generated with `next/og`
- Web Vitals (LCP, CLS, INP) logged via `useReportWebVitals`

---

## Project Structure

```
src/
├── app/
│   ├── actions/checkout.ts      # Server Action ("use server")
│   ├── cart/page.tsx            # Cart page
│   ├── checkout/page.tsx        # Checkout form + Suspense orders list
│   ├── layout.tsx               # Root layout (Server Component)
│   ├── opengraph-image.tsx      # Dynamic OG image
│   └── page.tsx                 # Home page (Server Component)
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── cart-badge.tsx
│   ├── cart-view.tsx
│   ├── checkout-form.tsx
│   ├── collapsible-panel.tsx
│   ├── mode-toggle.tsx
│   ├── product-list.tsx
│   ├── recent-orders.tsx
│   ├── server-clock.tsx
│   ├── store-initializer.tsx
│   ├── theme-provider.tsx
│   └── web-vitals.tsx
├── lib/
│   ├── orders.ts                # In-memory order store (demo)
│   ├── products.ts              # Product data
│   ├── schemas/checkout.ts      # Shared Zod schemas
│   └── utils.ts
└── store/
    └── cart-store.ts            # Zustand store
```

---

## Getting Started

### Prerequisites
- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/ShlokJain11/fst-assignment-1.git
cd fst-assignment-1
npm install
```

### Run in development

```bash
npm run dev
```

Open http://localhost:3000.

### Production build

```bash
npm run build
npm start
```

Run Lighthouse against the production build, since dev mode gives misleading performance numbers.

---

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Server Component | Product list and server/client boundary demo |
| `/cart` | Server page + client view | Persistent Zustand cart |
| `/checkout` | Server page + client form | Zod-validated form with Server Action |
| `/opengraph-image` | Generated | Dynamic OG image |

---

## How the Validation Works

1. The user fills in the checkout form.
2. `zodResolver(checkoutSchema)` validates in the browser and shows inline errors with no network request.
3. On submit, the form data and cart items (IDs and quantities only) are sent to the `placeOrder` Server Action.
4. The action re-validates the payload with `orderSchema`, because client-side checks can be bypassed.
5. The action applies server-only rules (for example, PIN code `000000` is rejected) and recomputes the total from trusted product data.
6. The result returns to the client, which shows a toast and maps any field errors onto the form.

---

## Lighthouse Results (Mobile, production build)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | | | | | | | |
| `/cart` | | | | | | | |
| `/checkout` | | | | | | | |

> INP cannot be measured in a lab Lighthouse run. Real INP values are logged in the browser console through `useReportWebVitals`.

---

## Screenshots

Add screenshots to a `docs/` folder and link them here:

```md
![Light theme](docs/light.png)
![Dark theme](docs/dark.png)
![Checkout validation](docs/checkout-errors.png)
![Lighthouse report](docs/lighthouse.png)
```

---

## Notes

- Orders are stored in memory for demonstration and reset when the server restarts. A database such as PostgreSQL with Prisma can replace `src/lib/orders.ts`.
- Set `metadataBase` in `layout.tsx` to your deployed URL so the OG image resolves correctly in production.

---

## License

Created for academic purposes.