"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal, X } from "lucide-react";
import * as React from "react";
import { ExproFilterPopoverContent } from "./expro-filter-popover-content";

const defaultTags = ["Bangladesh", "2024", "Intex", "3"];

const ExproResultsToolbar = ({ totalResults = 66, tags = defaultTags }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mt-2 px-1 py-4">
      <div className="flex flex-row justify-between gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className=" text-[16px] md:text-[20px] font-normal leading-none text-[#101828]">
            Expo : {totalResults} Results
          </p>

          <div className="hidden md:flex flex-wrap items-center gap-2 md:gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="inline-flex items-center justify-between gap-2 rounded-full bg-[#E4E7EC] px-4 py-1 text-sm font-normal leading-none text-[#344054] md:text-base"
              >
                <span className="text-[14px]">{tag}</span>
                <X className="h-4 w-4 text-[#98A2B3]" />
              </button>
            ))}
          </div>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative inline-flex h-9 w-fit items-center gap-2 rounded-md bg-[#ED8A19] px-4 text-base font-semibold text-white shadow-sm hover:bg-[#da7f18]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              <span className="absolute -right-[5px] -top-[5px] h-3.5 w-3.5 rounded-full bg-[#ED8A19] ring-2 ring-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0" align="end" sideOffset={8}>
            <ExproFilterPopoverContent onClose={() => setOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ExproResultsToolbar;
