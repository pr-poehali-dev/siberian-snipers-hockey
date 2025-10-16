export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  description: string;
  customizable?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  customName?: string;
  customNumber?: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
}
