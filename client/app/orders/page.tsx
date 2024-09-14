import OrderTable from "@/components/order-table/order-table";
import { API_BASE_URL } from "../_lib/config";
export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    status?: string;
    customerId: string;
  };
}) {
  const page = parseInt(searchParams.page ?? "1", 10);
  const limit = parseInt(searchParams.limit ?? "10", 10);
  const status = searchParams.status ?? "";

  const { orders, ordersPagination } = await fetchOrders(
    page,
    limit,
    status,
    searchParams.customerId
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
  customerId: string
) {
  const query = `customerId=${customerId}&page=${page}&limit=${limit}${
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
