import React from "react";
import Button from "@/components/shared/button";
import { FilterIcon, WorldMap } from "@/icons";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const style = {
  boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.04)",
};

const formSchema = z.object({
  businessCategoryIds: z.any().optional(),
  locationIds: z.any().optional(),
  keyword: z.string().optional(),
});

function HeroForm({
  isAnywhereDropdown = true,
  isCategoryDropdown = true,
  isFilterIcon = false,
  categories,
  locations,
  className = "",
}) {
  const router = useRouter();
  // Function to handle form submission
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessCategoryIds: "",
      locationIds: "",
      keyword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    console.log(queryString, "form queryString");
    router.push(`/company?${queryString}`);
  };

  return (
    <div
      className={`${
        isAnywhereDropdown ? "bg-white" : "bg-gray-50"
      } p-3 rounded-xl`}
      style={style}
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-y-3 gap-x-2 flex-wrap md:flex-nowrap"
        >
          <div className="flex w-full items-center gap-2 rounded-lg py-1 px-6 md:order-2">
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
          {isCategoryDropdown
            ? categories &&
              Array.isArray(categories) &&
              categories?.length > 0 && (
                <div className="md:order-1 lg:border-r lg:border-r-gray-300">
                  <FormField
                    control={form.control}
                    name="businessCategoryIds"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          className={className}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="text-gray-700 font-semibold text-sm leading-5 xs:w-[180px] border-none border-r border-r-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent">
                              <SelectValue
                                placeholder="All Categories"
                                className="text_16 text-red-400"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category, index) => (
                              <SelectItem
                                key={index}
                                value={String(category.id)}
                              >
                                {category?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              )
            : categories &&
              Array.isArray(categories) &&
              categories?.length > 0 && (
                <div className="hidden md:block md:order-1 lg:border-r lg:border-r-gray-300">
                  <Select className={className}>
                    <SelectTrigger className="text-gray-700 font-semibold text-sm leading-5 xs:w-[180px] border-none border-r border-r-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent">
                      <SelectValue
                        placeholder="All Categories"
                        className="text_16 text-red-400"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="flex gap-2 items-center">
                          All Categories
                        </SelectLabel>
                        {categories?.map((category, index) => (
                          <SelectItem key={index} value={String(category.id)}>
                            {category?.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

          {isAnywhereDropdown && (
            <div className="md:order-3">
              {locations &&
                Array.isArray(locations) &&
                locations?.length > 0 && (
                  <FormField
                    control={form.control}
                    name="locationIds"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          className={className}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
                            <SelectGroup>
                              <SelectLabel className="flex gap-2 items-center">
                                Anywhere
                              </SelectLabel>
                              {locations?.map((country) => (
                                <SelectItem
                                  key={country?.id}
                                  value={String(country?.id)}
                                >
                                  {country?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
            </div>
          )}

          <div className="md:flex-1 md:order-4 w-full md:w-auto">
            <div className="flex gap-2">
              {isAnywhereDropdown ? (
                <Button className="w-full md:w-[210px]" type="submit">
                  Search
                </Button>
              ) : (
                <Button
                  primaryOutline
                  className="w-full md:w-[210px]"
                  type="submit"
                >
                  Search
                </Button>
              )}

              {isFilterIcon && (
                <Button
                  secondary
                  type="button"
                  className="md:hidden !p-1 !w-10 !h-10 !min-w-10 !border-brand-300"
                >
                  <FilterIcon stroke="#C67618" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default HeroForm;
