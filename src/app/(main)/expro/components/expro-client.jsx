"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/shared";
import ExproHeroSearch from "./expro-hero-search";
import ExproCategoryStrip from "./expro-category-strip";
import ExproResultsToolbar from "./expro-results-toolbar";
import ExproListSection from "./expro-list-section";

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

    locationIds.forEach((value) => tags.push(value));
    companyIds.forEach((value) => tags.push(value));

    return tags;
  }, [searchParams, businessCategories]);

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
        <ExproResultsToolbar totalResults={totalResults} tags={activeTags} />
        <ExproListSection exproList={exproList} loading={false} />
      </Container>
    </section>
  );
};

export default ExproClient;
