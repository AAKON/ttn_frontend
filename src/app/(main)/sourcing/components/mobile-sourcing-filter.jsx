import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function MobileSourcingFilter({
  filterOptions,
  filters,
  onFilterChange,
}) {
  const priceRanges = [
    { id: "0-10", label: "$0 - $10" },
    { id: "10-50", label: "$10 - $50" },
    { id: "50-100", label: "$50 - $100" },
    { id: "100+", label: "$100+" },
  ];

  return (
    <div>
      <div className="">
        <Accordion type="single" collapsible className="grid gap-2">
          {/* By Country start */}
          <AccordionItem value="country" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Country
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
              {filterOptions &&
                filterOptions?.locations &&
                filterOptions?.locations.map((location) => (
                  <div className="grid grid-cols-1" key={location.id}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location.id}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={filters.locationId === location.id}
                        onCheckedChange={(isChecked) =>
                          onFilterChange(
                            "locationId",
                            location.id,
                            isChecked
                          )
                        }
                      />
                      <label
                        htmlFor={`location-${location.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                      >
                        {location.name}
                      </label>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Country end */}

          {/* By Category start */}
          <AccordionItem value="category" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Category
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
              {filterOptions &&
                filterOptions?.business_categories &&
                filterOptions?.business_categories.map((category) => (
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

          {/* By Price Per Unit start */}
          <AccordionItem value="price" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Price Per Unit ($)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
              {priceRanges.map((range) => (
                <div className="grid grid-cols-1" key={range.id}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`price-${range.id}`}
                      className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                      checked={filters.priceRange === range.id}
                      onCheckedChange={(isChecked) =>
                        onFilterChange("priceRange", range.id, isChecked)
                      }
                    />
                    <label
                      htmlFor={`price-${range.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                    >
                      {range.label}
                    </label>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Price Per Unit end */}
        </Accordion>
      </div>
    </div>
  );
}
