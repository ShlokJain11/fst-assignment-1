export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const products: Product[] = [
  { id: "p1", name: "Mechanical Keyboard", price: 3499, description: "Hot-swappable, 75% layout." },
  { id: "p2", name: "Noise-Cancelling Headphones", price: 7999, description: "40-hour battery life." },
  { id: "p3", name: "USB-C Hub", price: 1799, description: "7-in-1 with HDMI and SD card." },
  { id: "p4", name: "Laptop Stand", price: 1299, description: "Adjustable aluminium stand." },
];