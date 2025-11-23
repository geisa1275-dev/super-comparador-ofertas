export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  store: string;
  rating: number;
  reviews: number;
  cashback?: number;
  freeShipping?: boolean;
  installments?: string;
  category?: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'credit' | 'debit' | 'pix' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
