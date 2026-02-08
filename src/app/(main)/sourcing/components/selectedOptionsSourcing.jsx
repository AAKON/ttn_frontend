import React from "react";
import Button from "@/components/shared/button";
import { Cross } from "@/icons";

function SelectedOptionsSourcing({ selectedOptions, onRemove }) {
  if (!selectedOptions || selectedOptions.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex gap-x-5 mt-8">
        <div className="flex items-center gap-x-2 flex-wrap gap-y-2">
          {selectedOptions.map(({ key, id, name }) => (
            <Button
              type="button"
              secondary
              key={`${key}-${id}`}
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              {name}
              <span
                className="cursor-pointer size-4 flex items-center justify-center ml-[10px] relative"
                onClick={() => onRemove(key, id)}
              >
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedOptionsSourcing;
