"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import Select from "@/components/select/select";
import { Order, StatusFilteringData } from "@/lib/types/order";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { columns } from "@/components/order-table/order-column";

interface DataTableProps {
  data: Order[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function OrderTable({
  data,
  page,
  pageSize,
  totalPages,
}: DataTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const statusOptions: StatusFilteringData[] = [
    "PENDING",
    "FULFILLED",
    "FAILED",
    "CANCELLED",
  ];

  const updateUrl = (page: number, limit: number, status?: string) => {
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.replace(`/orders?${params.toString()}`);
  };

  const pageSizeChangeHandler = (newPageSize: number) => {
    const status = params.get("status");
    if (status) {
      updateUrl(1, newPageSize, status);
    } else {
      updateUrl(1, newPageSize);
    }
  };

  const nextPageHandler = () => {
    if (page < totalPages) {
      updateUrl(page + 1, pageSize);
    }
  };

  const previousPageHandler = () => {
    if (page > 0) {
      updateUrl(page - 1, pageSize);
    }
  };

  const statusChangeHandler = (status: StatusFilteringData) => {
    if (status === "ALL") updateUrl(1, pageSize);
    else {
      updateUrl(1, pageSize, status);
    }
  };

  return (
    <>
      <Select
        statusChangeHandler={statusChangeHandler}
        statusOptions={statusOptions}
      />
      <div className=" overflow-auto max-h-[30rem] ">
        <DataTable
          columns={columns}
          data={data}
          pageIndex={page - 1}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>

      <PaginationControls
        currentPage={page - 1}
        pageSize={pageSize}
        totalPages={totalPages}
        pageSizeChangeHandler={pageSizeChangeHandler}
        nextPageHandler={nextPageHandler}
        previousPageHandler={previousPageHandler}
      />
    </>
  );
}
