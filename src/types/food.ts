export type FoodCategory = 
  | 'All'
  | 'Fried Chicken'
  | 'Burgers'
  | 'Wraps'
  | 'Pizza'
  | 'Fries & Sides'
  | 'Nuggets & Wings'
  | 'Shawarma'
  | 'Drinks'
  | 'Desserts';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  calories?: number;
  isSpicy?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
  isVegetarian?: boolean;
  prepTime?: string;
  spicinessLevels?: string[];
  customizations?: ExtraOption[];
}

export interface CartCustomization {
  spicinessLevel?: string;
  selectedExtras: ExtraOption[];
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. item_id + timestamp + specs)
  menuItem: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  itemTotalPrice: number;
}

export interface Deal {
  id: string;
  title: string;
  tag: string;
  discountCode: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  image: string;
  badge: string;
  bgGradient: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  orderItemName?: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
}

export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered';

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    notes?: string;
  };
  paymentMethod: 'card' | 'apple_pay' | 'cash';
  status: OrderStatus;
  estimatedMinutes: number;
  createdAt: string;
}
