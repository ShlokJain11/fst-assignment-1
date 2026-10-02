import { ImageResponse } from "next/og";

export const alt = "ShopLab: accessible UI, Zustand state, type-safe Server Actions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        <div>ShopLab</div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.7 }}>
          Next.js · shadcn/ui · Zustand · Zod
        </div>
      </div>
    ),
    { ...size }
  );
}