"use client";
import { Cross, DeleteIcon, GridIcon, ListIcon } from "@/components/icons";
import { Section } from "@/components/shared";
import Button from "@/components/shared/button";
import React, { useEffect, useState } from "react";
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
import CompanyCardFilter from "@/components/cards/company-card-filter";
import FilterCardSkeleton from "@/components/shared/skelton/filterCardSkeleton";
import AccordionSkeleton from "@/components/shared/skelton/AccordionSkeleton";
import SelectedOptions from "@/app/(main)/business/components/selectedOptions";

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
  const [filterOptionLoading, setFilterOptionLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const initialFilters = {
    locationIds: [],
    manpower: [],
    complianceIds: [],
    businessCategoryIds: [],
  };

  const [filters, setFilters] = useState(initialFilters);
  const [companies, setCompanies] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);

  // Fetch filter options on load
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setFilterOptionLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/company/filter-options`
        );
        const data = await response.json();
        setFilterOptions(data.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setFilterOptionLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch companies when filters change
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/company/list`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
          }
        );
        const data = await response.json();
        setCompanies(data?.data?.data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [filters]);

  const handleFilterChange = (key, id, isChecked) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (isChecked) {
        updatedFilters[key] = [...(updatedFilters[key] || []), id];
      } else {
        updatedFilters[key] = updatedFilters[key].filter((item) => item !== id);
      }
      return updatedFilters;
    });
  };

  const resultsCount = companies.length;

  const resetFilterSelection = () => {
    setFilters(initialFilters);
  };

  return (
    <>
      <Section>
        <div className="mx-auto text-center">
          <h1 className="text-gray-900   font-semibold text-3xl sm:text-5xl md:leading-[60px] pb-10">
            Find Your Apparel Needs
          </h1>
          <HeroForm
            isAnywhereDropdown={false}
            isCategoryDropdown={false}
            isFilterIcon={true}
          />
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-[336px_1fr] gap-8">
          {/* Left Side Bar */}
          <div className="relative">
            {filterOptionLoading ? (
              <AccordionSkeleton />
            ) : (
              filterOptions && (
                <FilterAccordion
                  filterOptions={filterOptions}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilter={resetFilterSelection}
                />
              )
            )}
          </div>

          {/* Right Side */}
          <div>
            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
              <h3 className="text-gray-900 text-sm md:text-xl font-semibold">
                T-shirt manufactures: <span>{resultsCount}</span> Results
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

            {/*selected tags */}
            {/*<SelectedOptions />*/}
            {/* end display selected tags */}

            <div
              className={`mt-8 grid gap-3 lg:gap-8 ${
                view === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {loading ? (
                <FilterCardSkeleton />
              ) : companies &&
                Array.isArray(companies) &&
                companies.length > 0 ? (
                companies.map((company) => (
                  <CompanyCardFilter key={company.id} company={company} />
                ))
              ) : (
                <p className="text-center text-gray-500">No results found</p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Business;
