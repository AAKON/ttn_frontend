import { Container } from "@/shared";
import { Search } from "lucide-react";

const ExproPage = () => {
  return (
    <section className="bg-[#f3f4f6] py-12 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#0f172a]">
            Apparel & Textile Expo Network
          </h1>
          <p className="mt-3 text-base md:text-3xl text-[#64748b]">
            Where Exhibitors, Buyers & Brands Connect Worldwide
          </p>

          <div className="mt-8 md:mt-10 max-w-2xl mx-auto">
            <label className="sr-only" htmlFor="expro-search">
              Search
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 shadow-sm">
              <Search className="h-6 w-6 text-[#64748b]" />
              <input
                id="expro-search"
                type="search"
                placeholder="Search here..."
                className="w-full bg-transparent text-lg text-[#475569] placeholder:text-[#64748b] outline-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExproPage;
