"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/shared";
import ExproHeroSearch from "./components/expro-hero-search";
import ExproCategoryStrip from "./components/expro-category-strip";
import ExproResultsToolbar from "./components/expro-results-toolbar";
import ExproListSection from "./components/expro-list-section";

const ExproPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterOptionLoading, setFilterOptionLoading] = useState(true);
  const [businessCategories, setBusinessCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  useEffect(() => {
    const businessCategoryIds = searchParams.get("businessCategoryIds");
    if (!businessCategoryIds) {
      setSelectedCategoryId("all");
      return;
    }

    const parsedId = Number(businessCategoryIds.split(",")[0]);
    setSelectedCategoryId(Number.isNaN(parsedId) ? "all" : parsedId);
  }, [searchParams]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setFilterOptionLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/company/filter-options`
        );
        const data = await response.json();
        setBusinessCategories(data?.data?.business_categories || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setFilterOptionLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleCategorySelect = (categoryId) => {
    const nextCategoryId = categoryId === "all" ? "all" : Number(categoryId);
    setSelectedCategoryId(nextCategoryId);

    const params = new URLSearchParams(searchParams.toString());

    if (nextCategoryId === "all" || Number.isNaN(nextCategoryId)) {
      params.delete("businessCategoryIds");
    } else {
      params.set("businessCategoryIds", String(nextCategoryId));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const [appliedFilters, setAppliedFilters] = useState({
    country: [],
    year: [],
    organizer: [],
  });

  const handleApplyFilters = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  return (
    <section className="bg-500 py-8 md:py-20 lg:py-24">
      <Container>
        <ExproHeroSearch />
        <ExproCategoryStrip
          categories={businessCategories}
          loading={filterOptionLoading}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />
        <ExproResultsToolbar
          appliedFilters={appliedFilters}
          onApply={handleApplyFilters}
        />
        <ExproListSection />
      </Container>
    </section>
  );
};

export default ExproPage;
