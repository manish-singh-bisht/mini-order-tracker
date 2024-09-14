import OrderTable from "@/components/order-table/order-table";
import { API_BASE_URL } from "../_lib/config";
export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    status?: string;
    email: string;
  };
}) {
  //for now just going by this page /orders, but we can do it /orders/[email]
  const page = parseInt(searchParams.page ?? "1", 10);
  const limit = parseInt(searchParams.limit ?? "10", 10);
  const status = searchParams.status ?? "";

  const { orders, ordersPagination } = await fetchOrders(
    page,
    limit,
    status,
    searchParams.email
  );

  return (
    <div className="container mx-auto py-10">
      <OrderTable
        data={orders}
        pageIndex={ordersPagination.currentPage - 1}
        pageSize={ordersPagination.itemsPerPage}
        totalPages={ordersPagination.totalPages}
      />
    </div>
  );
}

async function fetchOrders(
  page: number,
  limit: number,
  status: string,
  email: string
) {
  const query = `email=${email}&page=${page}&limit=${limit}${
    status && status.length > 1 ? `&status=${status}` : ""
  }`;
  const res = await fetch(`${API_BASE_URL}/orders?${query}`);
  const data = await res.json();

  if (!res.ok) {
    if (data.error && data.error === "Customer not found") {
      throw new Error("No such customer!!!");
    } else {
      throw new Error("Error fetching orders.Please try again later.");
    }
  }

  return { orders: data.orders, ordersPagination: data.pagination };
}
