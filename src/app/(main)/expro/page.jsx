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

    return data?.data || [];
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return [];
  }
};

const getExproList = async (token) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", "1");

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

const ExproPage = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const [businessCategories, exproData] = await Promise.all([
    getFilterOptions(),
    getExproList(token),
  ]);

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
