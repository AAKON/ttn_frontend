import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";


export default function MobileFilterAccordion({
  filterOptions,
  filters,
  onFilterChange,
  onResetFilter,
}) {
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
                        id={`category-${location.id}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={false}
                        // onCheckedChange={(isChecked) =>
                        //   onFilterChange(
                        //     "businessLocationIds",
                        //     location.id,
                        //     isChecked
                        //   )
                        // }
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

          <AccordionItem value="btypes" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Types
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
              {filterOptions &&
                  filterOptions?.business_types &&
                  filterOptions?.business_types.map((type) => (
                      <div className="grid grid-cols-1" key={type.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id={`btype-${type.id}`}
                              className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                              checked={filters.businessTypeIds.includes(
                                  type.id
                              )}
                              onCheckedChange={(isChecked) =>
                                  onFilterChange(
                                      "businessTypeIds",
                                      type.id,
                                      isChecked
                                  )
                              }
                          />
                          <label
                              htmlFor={`btype-${type.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                          >
                            {type.name}
                          </label>
                        </div>
                      </div>
                  ))}
            </AccordionContent>
          </AccordionItem>
          {/*by types */}

          {/* By Type start */}
          <AccordionItem value="type" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Certificate
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
              {filterOptions &&
                filterOptions?.certificates &&
                filterOptions?.certificates.map((certificate) => (
                  <div className="grid grid-cols-1" key={certificate.id}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`certificate-${certificate.id}`}
                        className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500"
                        checked={filters.certificateIds.includes(certificate.id)}
                        onCheckedChange={(isChecked) =>
                          onFilterChange(
                            "certificateIds",
                            certificate.id,
                            isChecked
                          )
                        }
                      />
                      <label
                        htmlFor={`certificate-${certificate.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                      >
                        {certificate.name}
                      </label>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          {/* By Type end */}

          {/* By Size start */}
          <AccordionItem value="manpower" className="px-[14px] border border-gray-200 bg-gray-50 rounded-[8px]">
            <AccordionTrigger className="bg-transparent hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0 py-3">
              By Size
            </AccordionTrigger>
            <AccordionContent className="space-y-4 max-h-[270px] overflow-y-auto pt-3 border-t border-gray-200">
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
