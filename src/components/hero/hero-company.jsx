import React, { useState } from "react";
import Button from "@/components/shared/button";
import { FilterIcon, WorldMap } from "@/icons";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PopupFilterCard from "@/app/(main)/company/components/popup-filter-card";

const style = {
  boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.04)",
};
const formSchema = z.object({
  businessCategoryIds: z.any().optional(),
  locationIds: z.any().optional(),
  keyword: z.string().optional(),
});
export default function HeroCompanyForm({
  categories,
  locations,
  keyword,
  onSearchSubmit, // Add a prop for handling search submit
  className,
  // for only mobile filter
  filterOptions,
  filters,
  onFilterChange,
  onResetFilter,
}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessCategoryIds: filters?.businessCategoryIds,
      locationIds: filters?.locationId,
      keyword: keyword ? keyword : "",
    },
  });

  const onSubmit = async (data) => {
    if (onSearchSubmit) {
      const searchData = {
        locationId : data?.locationIds,
        businessCategoryIds : data?.businessCategoryIds && data?.businessCategoryIds.length > 0 ? data?.businessCategoryIds.length : null,
        keyword: data?.keyword
      }
      onSearchSubmit(searchData);
    }
  };

  return (
    <div className="bg-white p-3 rounded-xl" style={style}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-y-3 gap-x-2 flex-wrap lg:flex-nowrap"
        >
          {/* Search Input */}
          <div className="flex w-full items-center gap-2 rounded-lg py-1 px-6 lg:order-2">
            <span>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#D0D5DD"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full border-0 !shadow-none flex-1 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Search ..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Category Dropdown */}
          {categories && Array.isArray(categories) && categories.length > 0 && (
            <div className="lg:order-1 lg:border-r lg:border-r-gray-300">
              <FormField
                control={form.control}
                name="businessCategoryIds"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={filters?.businessCategoryIds?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="text-gray-700 font-semibold text-sm leading-5 xs:w-[180px] border-none border-r border-r-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent text-left">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"all"}>All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Location Dropdown */}
          <div className="lg:order-3">
            {locations && Array.isArray(locations) && locations?.length > 0 && (
              <FormField
                control={form.control}
                name="locationIds"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      className={className}
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={filters?.locationId?.toString()}
                    >
                      <SelectTrigger
                        className={`text-gray-700 font-semibold text-sm leading-5 xs:w-[180px] border-border focus:ring-0 focus:ring-offset-0 focus:ring-offset-none relative pl-11`}
                      >
                        <span className="absolute top-0 translate-y-1/2  left-[18px] z-0">
                          <WorldMap />
                        </span>
                        <SelectValue
                          placeholder="Anywhere"
                          className="text_16 text-red-400"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anywhere">Anywhere</SelectItem>
                        {locations?.map((country, index) => (
                          <SelectItem
                            key={country?.id || index}
                            value={String(country?.id || country)}
                          >
                            {country?.name || country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="lg:order-4 grid grid-cols-[1fr_87px] lg:grid-cols-[1fr] gap-2 lg:gap-0 w-full lg:w-auto">
            <Button className="" type="submit">
              Search
            </Button>
            <div className="lg:hidden">
              <PopupFilterCard
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={onFilterChange}
                onResetFilter={onResetFilter}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
