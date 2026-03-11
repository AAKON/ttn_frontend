"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const ExproHeroSearch = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();
    const queryString = trimmedKeyword
      ? `?${new URLSearchParams({ keyword: trimmedKeyword }).toString()}`
      : "";

    router.push(`/expro${queryString}`);
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#0f172a]">
        Apparel & Textile Expo Network
      </h1>
      <p className="mt-3 text-[14px] md:text-[18px] text-gray-500 leading-[28px]">
        Where Exhibitors, Buyers & Brands Connect Worldwide
      </p>

      <form
        className="mt-8 md:mt-10 max-w-2xl mx-auto"
        onSubmit={handleSearchSubmit}
      >
        <label className="sr-only" htmlFor="expro-search">
          Search
        </label>
        <div className="flex items-center gap-2 rounded-md border border-[#cbd5e1] bg-[#f8fafc] px-4 py-2.5 shadow-sm">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            id="expro-search"
            type="search"
            placeholder="Search here..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="w-full bg-transparent text-md text-[#475569] placeholder:text-[#64748b] outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default ExproHeroSearch;
