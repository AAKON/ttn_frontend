"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/shared";
import ExproHeroSearch from "./expro-hero-search";
import ExproCategoryStrip from "./expro-category-strip";
import ExproResultsToolbar from "./expro-results-toolbar";
import ExproListSection from "./expro-list-section";
import { initialData } from "./expro-filter-popover-content";

const ExproClient = ({ businessCategories = [], exproList = [], totalResults = 0 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategoryId = useMemo(() => {
    const categoryId = searchParams.get("category_id");
    if (!categoryId) return "all";

    const parsedId = Number(categoryId);
    return Number.isNaN(parsedId) ? "all" : parsedId;
  }, [searchParams]);

  const selectedFilters = useMemo(() => {
    return {
      country: searchParams.getAll("location_id[]"),
      year: searchParams.getAll("year[]"),
      organizer: searchParams.getAll("company_id[]"),
    };
  }, [searchParams]);

  const activeTags = useMemo(() => {
    const tags = [];
    const title = searchParams.get("title");
    const categoryId = searchParams.get("category_id");
    const locationIds = searchParams.getAll("location_id[]");
    const companyIds = searchParams.getAll("company_id[]");
    const years = searchParams.getAll("year[]");

    if (title) tags.push(title);
    years.forEach((year) => tags.push(year));

    if (categoryId) {
      const selectedCategory = businessCategories.find(
        (category) => String(category.id) === String(categoryId)
      );
      tags.push(selectedCategory?.name || categoryId);
    }

    locationIds.forEach((value) => {
      const item = initialData.country.find(d => d.id === value);
      tags.push(item?.label || value);
    });

    companyIds.forEach((value) => {
      const item = initialData.organizer.find(d => d.id === value);
      tags.push(item?.label || value);
    });

    return tags;
  }, [searchParams, businessCategories]);

  const handleApplyFilters = (filters) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("location_id[]");
    params.delete("year[]");
    params.delete("company_id[]");

    filters.country.forEach(id => params.append("location_id[]", id));
    filters.year.forEach(id => params.append("year[]", id));
    filters.organizer.forEach(id => params.append("company_id[]", id));

    params.set("page", "1");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleCategorySelect = (categoryId) => {
    const nextCategoryId = categoryId === "all" ? "all" : Number(categoryId);
    const params = new URLSearchParams(searchParams.toString());

    if (nextCategoryId === "all" || Number.isNaN(nextCategoryId)) {
      params.delete("category_id");
    } else {
      params.set("category_id", String(nextCategoryId));
    }

    params.set("page", "1");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <section className="bg-500 py-8 md:py-20 lg:py-24">
      <Container>
        <ExproHeroSearch />
        <ExproCategoryStrip
          categories={businessCategories}
          loading={false}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />
        <ExproResultsToolbar
          totalResults={totalResults}
          tags={activeTags}
          selectedFilters={selectedFilters}
          onApply={handleApplyFilters}
        />
        <ExproListSection exproList={exproList} loading={false} />
      </Container>
    </section>
  );
};

export default ExproClient;
