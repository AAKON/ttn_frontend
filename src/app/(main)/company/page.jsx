"use client";
import { GridIcon, ListIcon } from "@/components/icons";
import { Section } from "@/components/shared";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";

import FilterAccordion from "./components/filter-accordion";
import CompanyCardFilter from "@/components/cards/company-card-filter";
import FilterCardSkeleton from "@/components/shared/skelton/filterCardSkeleton";
import AccordionSkeleton from "@/components/shared/skelton/AccordionSkeleton";
import HeroCompanyForm from "@/components/hero/hero-company";
import SelectedOptions from "@/app/(main)/company/components/selectedOptions";
import TextAnimator from "@/components/hero/text-animatior";
import InfiniteScroll from "react-infinite-scroll-component";

const CompanyList = () => {
  const [view, setView] = useState("grid");
  const [filterOptionLoading, setFilterOptionLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  const searchParams = useSearchParams();

  // Extract query parameters
  const businessCategoryIds = searchParams.get("businessCategoryIds");
  const locationId = searchParams.get("locationIds");
  const keyword = searchParams.get("keyword");

  const initialFilters = {
    locationId: locationId ? parseInt(locationId, 10) : null,
    manpower: [],
    certificateIds: [],
    businessCategoryIds: businessCategoryIds
      ? [parseInt(businessCategoryIds, 10)]
      : [],
    businessTypeIds: [],
    keyword: keyword ? keyword : "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  const categories = filterOptions?.business_categories || [];
  const locations = filterOptions?.locations || null;

  console.log(filterOptions, 'get filterOptions');

  const fetchCompanies = async (page) => {
    if (page > pagination.last_page || loadingCompanies) return;
    setLoading(true);
    setLoadingCompanies(true);
    const session = await getSession();
    const token = session?.accessToken;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/list?page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filters),
        }
      );
      const data = await response.json();
      if (data && data?.data) {
        setCompanies((prev) => [...prev, ...data?.data?.data]);
        setPagination(data?.data?.pagination);
        setHasMore(page < data?.data?.pagination.last_page);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
      setLoadingCompanies(false);
    }
  };

  // Fetch companies when filters change
  useEffect(() => {
    fetchCompanies(1);
    setCompanies([]);
    setPagination({ current_page: 1, last_page: 1, total: 0 });
    setHasMore(true);
  }, [filters]);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (!loadingCompanies && hasMore) {
        fetchCompanies(pagination.current_page + 1);
      }
    }, 1000); // 1 seconds delay
  };

  const handleFilterChange = (key, id, isChecked) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (id === "all" || (!isNaN(id) === false && key !== "manpower")) {
        updatedFilters[key] = [];
      } else {
        if (key === "locationId") {
          updatedFilters[key] = isChecked ? id : null;
        } else {
          if (isChecked) {
            updatedFilters[key] = [...(updatedFilters[key] || []), id];
          } else {
            updatedFilters[key] = updatedFilters[key].filter(
              (item) => item !== id
            );
          }
        }
      }
      return updatedFilters;
    });
  };

  const handleSearchSubmit = (data) => {
    setFilters((prevFilters) => {
      const businessCategoryIds = isNaN(data.businessCategoryIds)
        ? []
        : [data.businessCategoryIds];
      const locationId = isNaN(data.locationId) ? [] : [data.locationId];
      return {
        ...prevFilters,
        ...data,
        businessCategoryIds: businessCategoryIds,
        locationId: locationId,
        keyword: data.keyword,
      };
    });
  };

  // display selected options functions
  const getSelectedOptions = () => {
    const selected = [];

    console.log(filters, 'get selected filters');

    // Map businessCategoryIds
    if (filters.businessCategoryIds.length > 0) {
      const selectedCategories = filters.businessCategoryIds
        .map((id) => {
          const category = filterOptions?.business_categories?.find(
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

    // Map business types
    if (filters.businessTypeIds.length > 0) {
      const selectedBtypes = filters.businessTypeIds
          .map((id) => {
            const type = filterOptions?.business_types?.find(
                (cat) => cat.id === id
            );
            return type ? { id, name: type.name } : null;
          })
          .filter(Boolean);

      selected.push(
          ...selectedBtypes.map(({ id, name }) => ({
            key: "businessTypeIds",
            id,
            name,
          }))
      );
    }

    // Map locationIds
    if (filters.locationId) {
      const location = filterOptions?.locations?.find(
        (loc) => loc.id === filters.locationId
      );

      if (location) {
        selected.push({
          key: "locationId",
          id: location.id,
          name: location.name,
        });
      }
    }

    // Map complianceIds
    if (filters.certificateIds.length > 0) {
      const selectedCertificate = filters.certificateIds
        .map((id) => {
          const certificate = filterOptions?.certificates?.find(
            (comp) => comp.id === id
          );
          return certificate ? { id, name: certificate.name } : null;
        })
        .filter(Boolean);

      selected.push(
        ...selectedCertificate.map(({ id, name }) => ({
          key: "certificateIds",
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

      if (key === "locationId") {
        if (updatedFilters[key] === id) {
          updatedFilters[key] = null;
        }
      } else if (key === "manpower") {
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
          <h1 className="main-title sm:text-2xl lg:text-[44px] text-gray-900 leading-normal pb-8 md:pb-10">
            Find Your{" "}
            <TextAnimator
              animationWordArray={["Apparel", "Textile", "Clothing", "Fabric"]}
              className={"text-primary"}
              cursorColor={"text-brand-600"}
            />
            Business Needs
          </h1>
          <div className="max-w-[1096px] mx-auto">
            <HeroCompanyForm
              isFilterIcon={true}
              categories={categories}
              locations={locations}
              keyword={filters.keyword}
              onSearchSubmit={handleSearchSubmit}
              //Only for mobile filter
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilter={resetFilterSelection}
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[336px_1fr] gap-8">
          <div className="hidden lg:block relative">
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
              <div className="hidden h-8 bg-gray-100 rounded-full border border-gray-200 p-1 md:flex items-center justify-center gap-1 ">
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
            {loading && <FilterCardSkeleton />}
            <InfiniteScroll
              dataLength={companies.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<FilterCardSkeleton />}
              endMessage={
                <p className="text-center text-lg text-gray-500 mt-10">
                  No more results
                </p>
              }
              scrollThreshold={0.5}
            >
              <div
                className={`mt-8 grid gap-3 lg:gap-8 ${
                  view === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {Array.isArray(companies) &&
                  companies?.length > 0 &&
                  companies?.map((company, index) => (
                    <CompanyCardFilter key={index} company={company} />
                  ))}
              </div>
            </InfiniteScroll>
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
