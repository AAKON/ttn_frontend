import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ExproClient from "./components/expro-client";

const getFilterOptions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expo/categories`,
      { cache: "no-store" }
    );
    const data = await response.json();
    console.log({data});
    
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return [];
  }
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
};

const getFirst = (value) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const getExproList = async (token, searchParamsInput = {}) => {
  const searchParams = await Promise.resolve(searchParamsInput);
  const queryParams = new URLSearchParams();

  const title = getFirst(searchParams?.title);
  const categoryId = getFirst(searchParams?.category_id);
  const locationIds = toArray(searchParams?.["location_id[]"]);
  const companyIds = toArray(searchParams?.["company_id[]"]);
  const years = toArray(searchParams?.["year[]"]);
  const perPage = getFirst(searchParams?.per_page);
  const page = getFirst(searchParams?.page);

  if (title) queryParams.set("title", String(title));
  if (categoryId) queryParams.set("category_id", String(categoryId));
  locationIds.forEach((value) => queryParams.append("location_id[]", String(value)));
  companyIds.forEach((value) => queryParams.append("company_id[]", String(value)));
  years.forEach((value) => queryParams.append("year[]", String(value)));
  if (perPage) queryParams.set("per_page", String(perPage));
  queryParams.set("page", page ? String(page) : "1");

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/expo?${queryParams.toString()}`,
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

    return {
      list: listData,
      total: total || 0,
    };
  } catch (error) {
    console.error("Error fetching expo list:", error);
    return {
      list: [],
      total: 0,
    };
  }
};

const ExproPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const [businessCategories, exproData] = await Promise.all([
    getFilterOptions(),
    getExproList(token, searchParams),
  ]);
  console.log({businessCategories});
  

  return (
    <Suspense fallback={<div className="container py-10">Loading...</div>}>
      <ExproClient
        businessCategories={businessCategories}
        exproList={exproData.list}
        totalResults={exproData.total}
      />
    </Suspense>
  );
};

export default ExproPage;
