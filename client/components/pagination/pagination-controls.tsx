import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationControlsProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  pageSizeChangeHandler: (pageSize: number) => void;
  nextPageHandler: () => void;
  previousPageHandler: () => void;
}

export function PaginationControls({
  currentPage,
  pageSize,
  totalPages,
  pageSizeChangeHandler,
  nextPageHandler,
  previousPageHandler,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center  justify-end px-2 py-4">
      <div className="w-fit px-2">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => pageSizeChangeHandler(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rows per page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} rows per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Pagination className=" ">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={previousPageHandler}
                className={
                  currentPage === 0 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index} className="border text-black">
                <PaginationLink
                  className={`rounded-none bg-white text-black ${
                    currentPage !== index
                      ? "bg-black text-white"
                      : "bg-white border-black"
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="cursor-pointer ">
              <PaginationNext
                onClick={nextPageHandler}
                className={
                  currentPage >= totalPages - 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
