export type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  images?: string[];
  stock?: number;
  featured?: boolean;
  popular?: boolean;
  special?: boolean;
  sku?: string;
  ratings?: { average: number; count: number };
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
};

export type Order = {
  _id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  subtotal?: number;
  shippingCost?: number;
  taxAmount?: number;
  items?: Array<{
    productName?: string;
    quantity: number;
    unitPrice?: number;
    lineTotal?: number;
    productImage?: string;
  }>;
  shippingAddress?: Record<string, string>;
  createdAt?: string;
  paymentMethod?: string;
  paymentStatus?: string;
};
