import { OrderStatus } from "@prisma/client";

export type GetOrdersQuery = {
  page?: string;
  limit?: string;
  status?: OrderStatus;
};

export type GetOrdersParams = {
  customerId: string;
};
