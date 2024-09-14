"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import Select from "@/components/select/select";
import { Order, StatusFilteringData } from "@/lib/types/order";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { columns } from "@/components/order-table/order-column";

interface DataTableProps {
  data: Order[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export default function OrderTable({
  data,
  pageIndex,
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
    params.set("page", (page + 1).toString());
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
      updateUrl(0, newPageSize, status);
    } else {
      updateUrl(0, newPageSize);
    }
  };

  const nextPageHandler = () => {
    if (pageIndex < totalPages - 1) {
      updateUrl(pageIndex + 1, pageSize);
    }
  };

  const previousPageHandler = () => {
    if (pageIndex > 0) {
      updateUrl(pageIndex - 1, pageSize);
    }
  };

  const statusChangeHandler = (status: StatusFilteringData) => {
    if (status === "ALL") updateUrl(0, pageSize);
    else {
      updateUrl(0, pageSize, status);
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
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>

      <PaginationControls
        currentPage={pageIndex}
        pageSize={pageSize}
        totalPages={totalPages}
        pageSizeChangeHandler={pageSizeChangeHandler}
        nextPageHandler={nextPageHandler}
        previousPageHandler={previousPageHandler}
      />
    </>
  );
}
