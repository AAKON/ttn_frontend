import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/shared/button";
import { FilterIcon } from "@/components/icons";
import MobileSourcingFilter from "./mobile-sourcing-filter";

const PopupSourcingFilter = ({
  filterOptions,
  filters,
  onFilterChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button secondary className="w-[87px] !px-3 !py-2" type="button">
          <FilterIcon stroke="#123123" width={20} height={15} />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md top-0 translate-y-0">
        <DialogHeader>
          <DialogTitle className="text-start">Filter</DialogTitle>
        </DialogHeader>
        <div className="h-[1px] bg-gray-200"></div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <MobileSourcingFilter
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupSourcingFilter;
