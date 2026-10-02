import { ModeToggle } from "@/components/mode-toggle";
import { ProductList } from "@/components/product-list";
import { CollapsiblePanel } from "@/components/collapsible-panel";
import { ServerClock } from "@/components/server-clock";
import { products } from "@/lib/products";

async function getProducts() {
  // Stand-in for a DB or API call; this code never reaches the browser
  await new Promise((r) => setTimeout(r, 300));
  return products;
}

export default async function Home() {
  console.log("[Home page] rendering on SERVER");
  const data = await getProducts();
  const fetchedAt = new Date().toISOString();

  return (
    <main className="mx-auto min-h-screen max-w-3xl space-y-6 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ShopLab</h1>
        <ModeToggle />
      </header>

      <CollapsiblePanel title="server info">
        <ServerClock />
      </CollapsiblePanel>

      <ProductList products={data} fetchedAt={fetchedAt} />
    </main>
  );
}