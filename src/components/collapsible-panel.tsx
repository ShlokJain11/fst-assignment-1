"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CollapsiblePanel({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border p-4">
      <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Hide" : "Show"} {title}
      </Button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}