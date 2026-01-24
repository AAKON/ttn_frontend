import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SourcingClient from "./components/SourcingClient";
import FilterProposalCardSkeleton from "@/components/shared/skelton/filterProposalCardSkeleton";

const getFilterOptions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/filter-options/sourcing-proposals`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return null;
  }
};

const getSourcings = async (token, searchParams) => {
  try {
    const queryParams = new URLSearchParams({
      page: "1",
      ...(searchParams?.keyword && { title: searchParams.keyword }),
    });
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
    if (data?.status) {
      return data?.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching sourcings:", error);
    return null;
  }
};

const SourcingPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const [filterOptions, sourcingsData] = await Promise.all([
    getFilterOptions(),
    getSourcings(token, searchParams),
  ]);

  return (
    <Suspense fallback={<div className="container"><FilterProposalCardSkeleton /></div>}>
      <SourcingClient
        initialSourcings={sourcingsData?.data || []}
        initialPagination={sourcingsData?.pagination || { current_page: 1, last_page: 1, total: 0 }}
        initialFilterOptions={filterOptions}
        initialKeyword={searchParams?.keyword || ""}
      />
    </Suspense>
  );
};

export default SourcingPage;
