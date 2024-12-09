"use client";
import CompanyCard from "@/components/cards/company-card";
import { Cross, DeleteIcon, GridIcon, ListIcon } from "@/components/icons";
import { Section } from "@/components/shared";
import Button from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";

// Static Icon
import countryIcon from "@/assets/country_icon.svg";
import grid_icon from "@/assets/grid.svg";
import layer_icon from "@/assets/layer_icon.svg";
import user_icon from "@/assets/user_icon.svg";
import batch_icon from "@/assets/batch_icon.svg";
import FilterAccordion from "./components/filter-accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroForm from "@/components/hero/hero-form";

const country = [
  "Afganisthan",
  "Africa",
  "Bangladesh",
  "india",
  "nepal",
  "chin",
];

const Business = () => {
  const [view, setView] = useState("grid");
  return (
    <>
      <Section>
        <div className="mx-auto text-center">
          <h3 className="text-gray-900   font-semibold text-3xl sm:text-5xl md:leading-[60px] pb-10">
            Find Your Apparel Needs
          </h3>
          <HeroForm isAnywhereDropdown={false} />
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-[336px_1fr] gap-8">
          {/* Left Side Bar */}
          <div>
            <div className="border border-gray-200 rounded-[8px]">
              <div className="flex items-center justify-between py-4 px-6">
                <strong className="text-gray-900 text-lg font-semibold leading-7">
                  Filter
                </strong>
                <Button secondary className="!border-0 !text-[#F04438]">
                  <DeleteIcon stroke="#F04438" width={15} height={17} />
                  <span>Clear all</span>
                </Button>
              </div>
              <div className="h-[1px] bg-gray-200"></div>
              <div className="py-5 px-6">
                <p className="text-sm font-semibold text-gray-900 leading-5 mb-3">
                  By Country
                </p>
                <Select>
                  <SelectTrigger className=" bg-gray-50 text-black font-semibold py-3 px-[18px] outline-none rounded-[8px] border-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Anywhere" />
                  </SelectTrigger>
                  <SelectContent className="text-gray-500">
                    {country.map((el, idx) => {
                      return (
                        <SelectItem key={idx} value={el}>
                          {el}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[1px] bg-gray-200"></div>
              <FilterAccordion />
            </div>
          </div>

          {/* Right Side */}
          <div>
            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
              <h3 className="text-gray-900 text-xl font-semibold">
                T-shirt manufactures: <span>{66}</span> Results
              </h3>
              <div className="h-8 bg-gray-100 rounded-full border border-gray-200 p-1 flex items-center justify-center gap1">
                <span
                  className={`h-6 w-10 cursor-pointer px-3 py-1 rounded-full flex items-center justify-center ${
                    view === "list" ? "bg-[#D0D5DD]" : "bg-transparent"
                  }`}
                  onClick={() => setView("list")}
                >
                  <ListIcon
                    height={12}
                    width={18}
                    stroke={view === "list" ? "#475467" : "#98A2B3"}
                  />
                </span>
                <span
                  className={`h-6 w-10 cursor-pointer px-3 py-1 rounded-full flex items-center justify-center ${
                    view === "grid" ? "bg-[#D0D5DD]" : "bg-transparent"
                  }`}
                  onClick={() => setView("grid")}
                >
                  <GridIcon
                    height={18}
                    width={18}
                    stroke={view === "grid" ? "#475467" : "#98A2B3"}
                  />
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-x-5 mt-8">
                <div className="flex items-center gap-x-2">
                  <Button
                    type="button"
                    secondary
                    className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
                  >
                    <Image
                      src={countryIcon}
                      alt="Country Icon"
                      width={16}
                      height={16}
                    />
                    Bangladesh
                    <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                      <Cross strokeColor="#D0D5DD" width={8} height={8} />
                    </span>
                  </Button>
                  <Button
                    type="button"
                    secondary
                    className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
                  >
                    <Image
                      src={grid_icon}
                      alt="Country Icon"
                      width={16}
                      height={16}
                    />
                    Machinery
                    <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                      <Cross strokeColor="#D0D5DD" width={8} height={8} />
                    </span>
                  </Button>
                  <Button
                    type="button"
                    secondary
                    className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
                  >
                    <Image
                      src={layer_icon}
                      alt="Country Icon"
                      width={16}
                      height={16}
                    />
                    Yarn
                    <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                      <Cross strokeColor="#D0D5DD" width={8} height={8} />
                    </span>
                  </Button>
                  <Button
                    type="button"
                    secondary
                    className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
                  >
                    <Image
                      src={user_icon}
                      alt="Country Icon"
                      width={16}
                      height={16}
                    />
                    Small
                    <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                      <Cross strokeColor="#D0D5DD" width={8} height={8} />
                    </span>
                  </Button>
                  <Button
                    type="button"
                    secondary
                    className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
                  >
                    <Image
                      src={batch_icon}
                      alt="Country Icon"
                      width={16}
                      height={16}
                    />
                    Lead Platinum
                    <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                      <Cross strokeColor="#D0D5DD" width={8} height={8} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={`mt-8 grid ${
                view === "list" ? "grid-cols-1" : "grid-cols-2"
              } gap-8`}
            >
              <CompanyCard />
              <CompanyCard />
              <CompanyCard />
              <CompanyCard />
              <CompanyCard />
              <CompanyCard />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Business;
