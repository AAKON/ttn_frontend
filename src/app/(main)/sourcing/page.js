"use client";
import { Section } from "@/components/shared";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import HeroCompanyForm from "@/components/hero/hero-company";
import TextAnimator from "@/components/hero/text-animatior";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sourcing Card Component 
import SourcingCard from "@/components/cards/sourcing-card";
import { Tags } from "@/components/hero/hero";
import { GridIcon, ListIcon } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import PopupSourcingFilter from "./components/popup-sourcing-filter";
import SourcingCardSkeleton from "@/components/shared/skelton/SourcingCardSkeleton";

const SourcingList = () => {
  const [view, setView] = useState("grid");

  const [filterOptions, setFilterOptions] = useState(null);
  const [sourcings, setSourcings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSourcings, setLoadingSourcings] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    location_id: null,
    product_category_id: null,
    currency: null,
    price_range: null,
    title: "",
    company_name: "",
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/filter-options/sourcing-proposals`
        );
        const data = await response.json();
        setFilterOptions(data.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const categories = filterOptions?.categories || [];
  const locations = filterOptions?.locations || [];
  const priceRanges = filterOptions?.price_ranges || [];

  // Fetch sourcings with pagination
  const fetchSourcings = async (page) => {
      if (page > pagination.last_page || loadingSourcings) return;
      setLoading(true);
      setLoadingSourcings(true);
      const session = await getSession();
      const token = session?.accessToken;
      
      // Build query string from filters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...(filters.location_id && { location_id: filters.location_id.toString() }),
        ...(filters.product_category_id && { product_category_id: filters.product_category_id.toString() }),
        ...(filters.currency && { currency: filters.currency }),
        ...(filters.price_range && { price_range: filters.price_range }),
        ...(filters.title && { title: filters.title }),
        ...(filters.company_name && { company_name: filters.company_name }),
      });
      
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sourcing-proposals/list?${queryParams}`,
          {
            method: "GET",
            cache: 'no-store',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if(data?.status) {
          if (data && data?.data) {
            setSourcings((prev) => [...prev, ...data?.data?.data]);
            setPagination(data?.data?.pagination);
            setTotalResults(data?.data?.pagination?.total);
            setHasMore(page < data?.data?.pagination.last_page);
          }
        }else{
          setLoading(false);
          setHasMore(false);
        }
  
      } catch (error) {
        console.error("Error fetching sourcings:", error);
      } finally {
        setLoading(false);
        setLoadingSourcings(false);
      }
    };

  // Fetch sourcings when filters change
  useEffect(() => {
    setSourcings([]);
    setPagination({ current_page: 1, last_page: 1, total: 0 });
    setHasMore(true);
    fetchSourcings(1);
  }, [filters]);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (!loadingSourcings && hasMore) {
        fetchSourcings(pagination.current_page + 1);
      }
    }, 1000); // 1 second delay
  };

  const handleSearchSubmit = (data) => {
    setFilters((prevFilters) => {
      const product_category_id = data.businessCategoryIds == null || isNaN(data.businessCategoryIds)
        ? null
        : data?.businessCategoryIds;
      const location_id = isNaN(data.locationId) ? null : data.locationId;
      return {
        ...prevFilters,
        location_id: location_id,
        product_category_id: product_category_id,
        title: data.keyword || "",
        company_name: "",
        currency: null,
        price_range: data.priceRange || null,
      };
    });
  };

  const handleFilterChange = (key, id, isChecked) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (key === "locationId") {
        updatedFilters.location_id = isChecked ? id : null;
      } else if (key === "priceRange") {
        updatedFilters.price_range = isChecked ? id : null;
      } else if (key === "businessCategoryIds") {
        updatedFilters.product_category_id = isChecked ? id : null;
      }
      return updatedFilters;
    });
  };

  const resultsCount = sourcings.length;

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="main-title sm:text-2xl lg:text-[44px] text-gray-900 leading-normal pb-8 md:pb-10">
            Find Your{" "}
            <TextAnimator
              animationWordArray={["Goods", "Partners"]}
              className={"text-primary"}
              cursorColor={"text-brand-600"}
            />
            From The Suppliers
          </h1>

          <div className="max-w-[1096px] mx-auto">
            <HeroCompanyForm
              categories={categories}
              locations={locations}
              keyword={filters.keyword}
              onSearchSubmit={handleSearchSubmit}
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              PopupFilterComponent={PopupSourcingFilter}
            />
          </div>
          <div className="hidden mt-4 md:mt-10 lg:flex justify-center items-center gap-3 md:gap-6 flex-wrap">
            <Tags outline tagText="Sports Wear" />
            <Tags outline tagText="Hoodie" />
            <Tags outline tagText="Tops" />
            <Tags outline tagText="Cotton Yarn" />
          </div>
        </div>
      </Section>

      {/* Sourcing Cards Section */}
      <Section>
        <div className="mx-auto">
          {/* Horizontal Dropdown Filters */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Select
              value={filters.location_id?.toString() || "all"}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  location_id: value === "all" ? null : parseInt(value, 10),
                }));
              }}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none">
                <SelectValue placeholder="By Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">By Country</SelectItem>
                {locations?.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.product_category_id?.toString() || "all"}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  product_category_id: value === "all" ? null : parseInt(value, 10),
                }));
              }}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none">
                <SelectValue placeholder="By Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">By Category</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.price_range || "all"}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  price_range: value === "all" ? null : value,
                }));
              }}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none">
                <SelectValue placeholder="By Price Per Unit ($)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">By Price Per Unit ($)</SelectItem>
                {priceRanges?.map((range) => (
                  <SelectItem key={range.id} value={range.id}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
              <h3 className="text-gray-900 text-sm md:text-xl font-semibold">
                T-shirt manufactures: {resultsCount} Resutls
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

            {loading && <SourcingCardSkeleton />}

            <InfiniteScroll
              dataLength={sourcings.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<SourcingCardSkeleton />}
              endMessage={
                <p className="text-center text-lg text-gray-500 mt-10">
                  No more results
                </p>
              }
              scrollThreshold={0.5}
            >
              <div
                className={`mt-8 grid gap-3 lg:gap-8 ${
                  view === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {Array.isArray(sourcings) &&
                  sourcings?.length > 0 &&
                  sourcings?.map((sourcing, index) => (
                    <SourcingCard key={index} sourcing={sourcing} />
                  ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </Section>

      {/* Get In Touch Section */}
      <GetInTouch />
    </>
  );
};

const Sourcing = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SourcingList />
  </Suspense>
);

export default Sourcing;
