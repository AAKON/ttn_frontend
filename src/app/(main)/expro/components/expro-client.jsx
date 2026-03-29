"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@/shared";
import ExproHeroSearch from "./expro-hero-search";
import ExproCategoryStrip from "./expro-category-strip";
import ExproResultsToolbar from "./expro-results-toolbar";
import ExproListSection from "./expro-list-section";
import { initialData } from "./expro-filter-popover-content";
import ExpoRegistrationModal from "./expo-registration-modal";

const normalizeOrganizerOptions = (items = []) =>
  items
    .map((item) => {
      if (item?.id === undefined || item?.id === null || !item?.label) return null;
      const count = Number(item.count);
      const expoCount = Number(item.expo_count ?? item.expos_count ?? item.count);

      return {
        id: String(item.id),
        label: String(item.label),
        count: Number.isFinite(count) ? count : 0,
        expo_count: Number.isFinite(expoCount) ? expoCount : 0,
      };
    })
    .filter(Boolean);

const buildExpoQueryParams = ({
  title = "",
  categoryId = "all",
  filters = { country: [], year: [], organizer: [] },
  page = 1,
}) => {
  const params = new URLSearchParams();

  if (title) {
    params.set("title", String(title));
  }

  if (categoryId !== "all" && !Number.isNaN(Number(categoryId))) {
    params.set("category_id", String(categoryId));
  }

  (filters.country || []).forEach((value) =>
    params.append("location_id[]", String(value))
  );
  (filters.year || []).forEach((value) =>
    params.append("year[]", String(value))
  );
  (filters.organizer || []).forEach((value) =>
    params.append("company_id[]", String(value))
  );

  params.set("page", String(page || 1));
  return params;
};

const ExproClient = ({
  businessCategories = [],
  exproList = [],
  totalResults = 0,
  initialCategoryId = "all",
}) => {
  const { data: session, status } = useSession();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedExpoSlug, setSelectedExpoSlug] = useState("");
  const [selectedVisitorRegUrl, setSelectedVisitorRegUrl] = useState("");
  const [organizerFilterData, setOrganizerFilterData] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategoryId === "all" || Number.isNaN(Number(initialCategoryId))
      ? "all"
      : Number(initialCategoryId)
  );
  const [selectedFilters, setSelectedFilters] = useState({
    country: [],
    year: [],
    organizer: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [clientExproList, setClientExproList] = useState(exproList);
  const [clientTotalResults, setClientTotalResults] = useState(totalResults);
  const [isListLoading, setIsListLoading] = useState(false);
  const hasHydratedRef = useRef(false);

  const handleOrganizerOptionsLoaded = useCallback((options = []) => {
    if (!Array.isArray(options)) return;
    const normalizedOptions = normalizeOrganizerOptions(options);
    setOrganizerFilterData((prev) => {
      const merged = new Map(prev.map((item) => [item.id, item]));
      normalizedOptions.forEach((item) => {
        merged.set(item.id, item);
      });
      return Array.from(merged.values());
    });
  }, []);

  const fetchExproListClient = useCallback(
    async ({
      title = "",
      categoryId = "all",
      filters = { country: [], year: [], organizer: [] },
      page = 1,
    }) => {
      setIsListLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (session?.accessToken) {
          headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const params = buildExpoQueryParams({
          title,
          categoryId,
          filters,
          page,
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/expo?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            headers,
          }
        );

        const data = await response.json();
        const payload = data?.data ?? data;
        const listData = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.items)
              ? payload.items
              : [];

        const pagination = payload?.pagination ?? payload?.meta;
        const total = pagination?.total ?? payload?.total ?? listData.length;

        setClientExproList(listData);
        setClientTotalResults(total || 0);
      } catch (error) {
        console.error("Error fetching expo list on client:", error);
        setClientExproList([]);
        setClientTotalResults(0);
      } finally {
        setIsListLoading(false);
      }
    },
    [session?.accessToken]
  );

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true;
      return;
    }

    if (status === "loading") return;

    fetchExproListClient({
      title: appliedKeyword,
      categoryId: selectedCategoryId,
      filters: selectedFilters,
      page: currentPage,
    });
  }, [
    appliedKeyword,
    selectedCategoryId,
    selectedFilters,
    currentPage,
    status,
    fetchExproListClient,
  ]);

  const activeTags = useMemo(() => {
    const tags = [];
    if (appliedKeyword) {
      tags.push({ label: appliedKeyword, key: "title", value: appliedKeyword });
    }

    selectedFilters.year.forEach((year) => {
      tags.push({ label: year, key: "year[]", value: year });
    });

    selectedFilters.country.forEach((value) => {
      const item = initialData.country.find((d) => d.id === value);
      tags.push({ label: item?.label || value, key: "location_id[]", value: value });
    });

    selectedFilters.organizer.forEach((value) => {
      const item = organizerFilterData.find((d) => d.id === value);
      tags.push({ label: item?.label || value, key: "company_id[]", value: value });
    });

    return tags;
  }, [appliedKeyword, selectedFilters, organizerFilterData]);

  const handleRemoveTag = (tag) => {
    if (tag.key === "title") {
      setKeywordInput("");
      setAppliedKeyword("");
      setCurrentPage(1);
      return;
    }

    setSelectedFilters((prev) => {
      if (tag.key === "year[]") {
        return {
          ...prev,
          year: prev.year.filter((value) => value !== tag.value),
        };
      }

      if (tag.key === "location_id[]") {
        return {
          ...prev,
          country: prev.country.filter((value) => value !== tag.value),
        };
      }

      if (tag.key === "company_id[]") {
        return {
          ...prev,
          organizer: prev.organizer.filter((value) => value !== tag.value),
        };
      }

      return prev;
    });
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters({
      country: filters.country || [],
      year: filters.year || [],
      organizer: filters.organizer || [],
    });
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId) => {
    const nextCategoryId = categoryId === "all" ? "all" : Number(categoryId);
    setSelectedCategoryId(
      nextCategoryId === "all" || Number.isNaN(nextCategoryId) ? "all" : nextCategoryId
    );
    setCurrentPage(1);
  };

  const handleSearch = (nextKeyword) => {
    setKeywordInput(nextKeyword);
    setAppliedKeyword(nextKeyword);
    setCurrentPage(1);
  };

  const handleRegistrationModalOpenChange = (nextOpen) => {
    setIsRegistrationModalOpen(nextOpen);
    if (!nextOpen) {
      setSelectedExpoSlug("");
      setSelectedVisitorRegUrl("");
    }
  };

  return (
    <section className="bg-500 py-8 md:py-20 lg:py-24">
      <Container>
        <ExproHeroSearch
          keyword={keywordInput}
          onKeywordChange={setKeywordInput}
          onSearch={handleSearch}
        />
        <ExproCategoryStrip
          categories={businessCategories}
          loading={false}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />
        <ExproResultsToolbar
          totalResults={clientTotalResults}
          tags={activeTags}
          selectedFilters={selectedFilters}
          organizerOptions={organizerFilterData}
          onOrganizerOptionsLoaded={handleOrganizerOptionsLoaded}
          onApply={handleApplyFilters}
          onRemoveTag={handleRemoveTag}
        />
        <ExproListSection
          onRegisterClick={(expoSlug, visitorRegUrl) => {
            setSelectedExpoSlug(String(expoSlug || ""));
            setSelectedVisitorRegUrl(String(visitorRegUrl || ""));
            setIsRegistrationModalOpen(true);
          }}
          exproList={clientExproList}
          loading={isListLoading}
        />
      </Container>
      <ExpoRegistrationModal
        open={isRegistrationModalOpen}
        onOpenChange={handleRegistrationModalOpenChange}
        expoSlug={selectedExpoSlug}
        visitorRegUrl={selectedVisitorRegUrl}
        modalId="expro_list"
      />
    </section>
  );
};

export default ExproClient;
