"use client";
import { GridIcon, ListIcon } from "@/components/icons";
import { Section } from "@/components/shared";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import FilterAccordion from "./components/filter-accordion";
import CompanyCardFilter from "@/components/cards/company-card-filter";
import FilterCardSkeleton from "@/components/shared/skelton/filterCardSkeleton";
import AccordionSkeleton from "@/components/shared/skelton/AccordionSkeleton";
import HeroCompanyForm from "@/components/hero/hero-company";
import SelectedOptions from "@/app/(main)/company/components/selectedOptions";

const CompanyList = () => {
  const [view, setView] = useState("grid");
  const [filterOptionLoading, setFilterOptionLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // Extract query parameters
  const businessCategoryIds = searchParams.get("businessCategoryIds");
  const locationIds = searchParams.get("locationIds");
  const keyword = searchParams.get("keyword");

  const initialFilters = {
    locationIds: locationIds ? [parseInt(locationIds, 10)] : [],
    manpower: [],
    complianceIds: [],
    businessCategoryIds: businessCategoryIds
      ? [parseInt(businessCategoryIds, 10)]
      : [],
    keyword: keyword ? keyword : "",
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

  const categories = filterOptions?.categories || [];

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
      if (key === "locationIds") {
        updatedFilters[key] = isChecked ? [id] : [];
      } else {
        if (isChecked) {
          updatedFilters[key] = [...(updatedFilters[key] || []), id];
        } else {
          updatedFilters[key] = updatedFilters[key].filter(
            (item) => item !== id
          );
        }
      }
      return updatedFilters;
    });
  };

  const handleSearchSubmit = (data) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...data,
      businessCategoryIds: data.businessCategoryIds
        ? [data.businessCategoryIds]
        : prevFilters.businessCategoryIds,
      keyword: data.keyword || prevFilters.keyword,
    }));
  };

  // display selected options functions

  const getSelectedOptions = () => {
    const selected = [];

    // Map businessCategoryIds
    if (filters.businessCategoryIds.length > 0) {
      const selectedCategories = filters.businessCategoryIds
        .map((id) => {
          const category = filterOptions?.categories?.find(
            (cat) => cat.id === id
          );
          return category ? { id, name: category.name } : null;
        })
        .filter(Boolean);

      selected.push(
        ...selectedCategories.map(({ id, name }) => ({
          key: "businessCategoryIds",
          id,
          name,
        }))
      );
    }

    // Map locationIds
    if (filters.locationIds.length > 0) {
      const selectedLocations = filters.locationIds
        .map((id) => {
          const location = filterOptions?.locations?.find(
            (loc) => loc.id === id
          );
          return location ? { id, name: location.name } : null;
        })
        .filter(Boolean);

      selected.push(
        ...selectedLocations.map(({ id, name }) => ({
          key: "locationIds",
          id,
          name,
        }))
      );
    }

    // Map complianceIds
    if (filters.complianceIds.length > 0) {
      const selectedCompliance = filters.complianceIds
        .map((id) => {
          const compliance = filterOptions?.compliances?.find(
            (comp) => comp.id === id
          );
          return compliance ? { id, name: compliance.name } : null;
        })
        .filter(Boolean);

      selected.push(
        ...selectedCompliance.map(({ id, name }) => ({
          key: "complianceIds",
          id,
          name,
        }))
      );
    }

    // Map manpower (no ID, direct values)
    if (filters.manpower.length > 0) {
      selected.push(
        ...filters.manpower.map((value) => ({
          key: "manpower",
          id: value,
          name: value,
        }))
      );
    }

    return selected;
  };

  // remove selected tags
  const handleRemoveFilter = (key, id) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (key === "manpower") {
        updatedFilters[key] = updatedFilters[key].filter(
          (value) => value !== id
        );
      } else {
        updatedFilters[key] = updatedFilters[key].filter(
          (itemId) => itemId !== id
        );
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
      <Section className="bg-gray-50">
        <div className="mx-auto text-center">
          <h3 className="text-gray-900 font-semibold text-3xl sm:text-5xl md:leading-[60px] pb-10">
            Find Your Apparel Needs
          </h3>
          <HeroCompanyForm
            isFilterIcon={true}
            categories={categories}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] xl:grid-cols-[336px_1fr] gap-8">
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

          <div>
            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
              <h3 className="text-gray-900 text-sm md:text-xl font-semibold">
                Search Results: <span>{resultsCount}</span> Results found
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
            {/*selected options */}
            <SelectedOptions
              selectedOptions={getSelectedOptions()}
              onRemove={handleRemoveFilter}
            />
            {/* end display selected options */}
            <div
              className={`mt-8 grid gap-3 lg:gap-8 ${
                view === "list" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
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

const Company = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CompanyList />
  </Suspense>
);

export default Company;
