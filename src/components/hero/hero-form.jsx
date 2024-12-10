import React from "react";
import Button from "@/components/ui/button";
import { Categories, Country } from "@/components/hero/hero";
import { FilterIcon } from "@/icons";

const style = {
  boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.04)",
};

function HeroForm({
  isAnywhereDropdown = true,
  isCategoryDropdown = true,
  isFilterIcon = false,
}) {
  return (
    <div
      className={`${
        isAnywhereDropdown ? "bg-white" : "bg-gray-50"
      } p-3 rounded-xl mt-4`}
      style={style}
    >
      <form
        action=""
        className="flex items-center justify-between gap-y-3 gap-x-2 flex-wrap md:flex-nowrap"
      >
        <div className="flex w-full items-center gap-2 rounded-lg py-3 px-6 md:order-2">
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
          <input
            className="w-full flex-1 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent focus:border-none"
            type="search"
            placeholder="T-shirt manufacturer"
          />
        </div>
        {isCategoryDropdown ? (
          <div className="md:order-1 lg:border-r lg:border-r-gray-300">
            <Categories />
          </div>
        ) : (
          <div className="hidden md:block md:order-1 lg:border-r lg:border-r-gray-300">
            <Categories />
          </div>
        )}
        {isAnywhereDropdown && (
          <div className="md:order-3">
            <Country />
          </div>
        )}
        <div className="flex-1 md:order-4">
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
    </div>
  );
}

export default HeroForm;
