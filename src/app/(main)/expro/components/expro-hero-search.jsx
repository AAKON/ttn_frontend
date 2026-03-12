"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const ExproHeroSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword);
    } else {
      params.delete("keyword");
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#0f172a]">
        Apparel & Textile Expo Network
      </h1>
      <p className="mt-2 md:mt-3 text-[14px] md:text-[18px] text-gray-500 leading-[20px] md:leading-[28px]">
        Where Exhibitors, Buyers & Brands Connect Worldwide
      </p>

      <form
        className="mt-6 md:mt-10 max-w-2xl mx-auto"
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
