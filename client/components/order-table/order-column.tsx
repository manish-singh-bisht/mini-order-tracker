"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/lib/types/order";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
    cell: ({ row }) =>
      `${row.original.customer.firstName} ${row.original.customer.lastName}`,
  },

  {
    accessorKey: "status",
    header: "Status",
  },
];
