"use client";
import { Section } from "@/components/shared";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const SourcingList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterOptions, setFilterOptions] = useState(null);
  const [sourcings, setSourcings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    locationId: null,
    businessCategoryIds: [],
    keyword: "",
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/company/filter-options`
        );
        const data = await response.json();
        setFilterOptions(data.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const categories = filterOptions?.business_categories || [];
  const locations = filterOptions?.locations || [];

  // Fetch sourcings
  useEffect(() => {
    const fetchSourcings = async () => {
      setLoading(true);
      try {
        // Mock data for now
        const mockData = Array.from({ length: 9 }, (_, i) => ({
          id: i + 1,
          category: i % 3 === 0 ? "Garments" : i % 3 === 1 ? "Textile" : "Fabric",
          title: `Looking for T-shirt Manufacturer in Bangladesh`,
          description:
            "We are looking for reliable FOB T-shirt manufacturers in Bangladesh who are certified with GOTS (Global Organic Textile Standard)",
          location: "Singapore",
          company_name: "ABC Group",
          posted_date: "28 Feb 2024 02:37",
          tags: ["Fabric", "Yarn", "Washing", "Dying", "Knit"],
        }));

        setSourcings(mockData);
      } catch (error) {
        console.error("Error fetching sourcings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSourcings();
  }, [filters]);

  const handleSearchSubmit = (data) => {
    setFilters({
      locationId: data.locationId,
      businessCategoryIds: data.businessCategoryIds ? [data.businessCategoryIds] : [],
      keyword: data.keyword || "",
    });
  };

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
            />
          </div>
          <div className="mt-4 md:mt-10 flex justify-center items-center gap-3 md:gap-6 flex-wrap">
            <Tags outline tagText="Sports Wear" />
            <Tags outline tagText="Hoodie" />
            <Tags outline tagText="Tops" />
            <Tags outline tagText="Cotton Yarn" />
        </div>
        </div>
      </Section>

      {/* Sourcing Cards Section */}
      <Section>
        <div className=" mx-auto">
          {/* Horizontal Dropdown Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Select
              value={filters.locationId?.toString() || "all"}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  locationId: value === "all" ? null : parseInt(value, 10),
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
              value={
                filters.businessCategoryIds.length > 0
                  ? filters.businessCategoryIds[0].toString()
                  : "all"
              }
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  businessCategoryIds: value === "all" ? [] : [parseInt(value, 10)],
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

            <Select defaultValue="all">
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none">
                <SelectValue placeholder="By Price Per Unit ($)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">By Price Per Unit ($)</SelectItem>
                <SelectItem value="0-10">$0 - $10</SelectItem>
                <SelectItem value="10-50">$10 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100+">$100+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              {sourcings.length} Sourcing Proposals
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-lg h-80"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sourcings.map((sourcing) => (
                <SourcingCard key={sourcing.id} sourcing={sourcing} />
              ))}
            </div>
          )}
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
