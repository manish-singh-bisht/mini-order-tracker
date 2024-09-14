import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilteringData } from "@/lib/types/order";

interface SelectPropsInterface {
  statusChangeHandler: (value: StatusFilteringData) => void;
  statusOptions: StatusFilteringData[];
}

export default function StatusSelect({
  statusChangeHandler,
  statusOptions,
}: SelectPropsInterface) {
  return (
    <div className="flex items-center justify-end py-4">
      <Select
        onValueChange={(value) =>
          statusChangeHandler(value as StatusFilteringData)
        }
      >
        <SelectTrigger className="px-4 w-fit">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ALL</SelectItem>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
