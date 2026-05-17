// Created by: M Ehtisham Amjad (231996)
export interface Product {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Premium Laptop Backpack",
    description:
      "A sleek waterproof backpack built for students and professionals with organized compartments and all-day comfort.",
    detailedDescription:
      "Designed for fast-paced city life, this premium backpack combines weather resistance with a smart internal layout. It protects your laptop, keeps accessories sorted, and stays comfortable even during long commutes.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    category: "Accessories",
    features: [
      "Waterproof polyester exterior",
      "Padded laptop sleeve for 15.6-inch devices",
      "Dedicated cable and stationery compartments",
      "Breathable ergonomic shoulder straps",
    ],
    inStock: true,
  },
  {
    id: "2",
    title: "Wireless Earbuds Pro",
    description:
      "Crystal-clear audio with active noise cancellation and a pocket-sized charging case built for nonstop productivity.",
    detailedDescription:
      "Wireless Earbuds Pro deliver rich sound and stable connectivity for calls, classes, and workouts. With adaptive noise cancellation and a compact fast-charging case, they are ideal for everyday use in busy environments.",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80",
    category: "Electronics",
    features: [
      "Active noise cancellation",
      "Up to 24 hours combined battery life",
      "Dual microphones for clear calls",
      "IPX4 splash resistance",
    ],
    inStock: true,
  },
  {
    id: "3",
    title: "Smart Watch Series 5",
    description:
      "A modern smartwatch with fitness tracking, heart-rate insights, and GPS navigation in a polished lightweight body.",
    detailedDescription:
      "The Smart Watch Series 5 helps you stay active and connected through your day. It tracks health metrics, logs workouts, and supports smart notifications with a bright display that remains visible outdoors.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    category: "Wearables",
    features: [
      "Real-time heart-rate monitoring",
      "Integrated GPS route tracking",
      "Sleep and fitness analytics",
      "7-day battery with magnetic charging",
    ],
    inStock: true,
  },
];

export function findProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
