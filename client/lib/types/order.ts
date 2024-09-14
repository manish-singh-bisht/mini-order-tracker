//zod can make this easier

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone?: string | null;
  createdAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
    price: number;
  };
};

export type Order = {
  id: string;
  customerId: string;
  orderDate: Date;
  totalAmount: number;
  status: StatusData;
  shippingMethod: ShippingMethod;
  shippingAddress: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  orderItems: OrderItem[];
};

export type Pagination<T> = {
  items: T[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalOrdersCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type StatusData = "PENDING" | "CANCELLED" | "FULFILLED" | "FAILED";
export type StatusFilteringData = StatusData | "ALL";
export type ShippingMethod = "STANDARD" | "PICKUP";
