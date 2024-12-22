export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface ShippingAddress {
  id: number;
  detailedAddress: string;
  district: string;
  city: string;
  country: string;
  customer: string;
  phoneNumber: string;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  totalQuantity: number;
  totalPrice: number;
  note: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatusType {
  id: number;
  status: string;
}
