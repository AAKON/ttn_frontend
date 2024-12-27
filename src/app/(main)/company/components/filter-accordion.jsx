import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import Button from "@/components/shared/button";
import { DeleteIcon } from "@/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterAccordion({
  filterOptions,
  filters,
  onFilterChange,
  onResetFilter,
}) {
  return (
    <div>
      <div className="border border-gray-200 rounded-[8px]">
        <div className="flex items-center justify-between py-2 sm:py-4 px-6">
          <strong className="text-gray-900 text-lg font-semibold leading-7">
            Filter
          </strong>
          <Button
            secondary
            className="!border-0 !text-[#F04438]"
            onClick={onResetFilter}
          >
            <DeleteIcon stroke="#F04438" width={15} height={17} />
            <span>Clear all</span>
          </Button>
        </div>
        <div className="h-[1px] bg-gray-200"></div>
        <div className="py-3 sm:py-5 px-6">
          <p className="text-sm font-semibold text-gray-900 leading-5 mb-3">
            By Country
          </p>
          <Select
            onValueChange={(value) =>
              onFilterChange("locationIds", value, true)
            }
          >
            <SelectTrigger className=" bg-gray-50 text-black font-semibold py-3 px-[18px] outline-none rounded-[8px] border-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Anywhere" />
            </SelectTrigger>
            <SelectContent className="text-gray-500">
              {filterOptions &&
                filterOptions?.locations &&
                filterOptions?.locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-[1px] bg-gray-200"></div>
        <Accordion type="single" collapsible>
          {/* By Category start */}
          <AccordionItem value="category" className="xs:py-3 sm:py-5 px-6">
            <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
              By Category
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {filterOptions &&
                filterOptions?.categories &&
                filterOptions?.categories.map((category) => (
                  <div className="grid grid-cols-1" key={category.id}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={filters.businessCategoryIds.includes(
                          category.id
                        )}
                        onCheckedChange={(isChecked) =>
                          onFilterChange(
                            "businessCategoryIds",
                            category.id,
                            isChecked
                          )
                        }
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Category end */}

          {/* By Type start */}
          <AccordionItem value="type" className="xs:py-3 sm:py-5 px-6">
            <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
              By Certificate
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {filterOptions &&
                filterOptions?.compliances &&
                filterOptions?.compliances.map((compliance) => (
                  <div className="grid grid-cols-1" key={compliance.id}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`compliance-${compliance.id}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={filters.complianceIds.includes(compliance.id)}
                        onCheckedChange={(isChecked) =>
                          onFilterChange(
                            "complianceIds",
                            compliance.id,
                            isChecked
                          )
                        }
                      />
                      <label
                        htmlFor={`compliance-${compliance.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                      >
                        {compliance.name}
                      </label>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Type end */}

          {/* By Size start */}
          <AccordionItem value="manpower" className="xs:py-3 sm:py-5 px-6">
            <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
              By Size
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {filterOptions &&
                filterOptions?.size &&
                filterOptions?.size.map((size, index) => (
                  <div className="grid grid-cols-1" key={index}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${index}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={filters.manpower.includes(size)}
                        onCheckedChange={(isChecked) =>
                          onFilterChange("manpower", size, isChecked)
                        }
                      />
                      <label
                        htmlFor={`size-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                      >
                        {size}
                      </label>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Size end */}
        </Accordion>
      </div>
    </div>
  );
}
