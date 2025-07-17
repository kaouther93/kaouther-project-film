export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id: string;
  brand_id: string;
  sku?: string;
  stock_quantity: number;
  image_url?: string;
  images?: string[];
  ingredients?: string;
  usage_instructions?: string;
  skin_type?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  brand?: Brand;
  reviews?: Review[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address?: string;
  billing_address?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  product?: Product;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}