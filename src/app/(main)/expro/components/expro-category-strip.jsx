"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "All Categories",
  "Garment",
  "Dying",
  "Knitting",
  "Sustainability",
  "Garment",
  "Dying",
  "Knitting",
  "Sustainability",
  "Garment",
  "Dying",
  "Yarn Machinery",
];

const ExproCategoryStrip = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1
    );
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    const resizeObserver = new ResizeObserver(() => updateScrollState());

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollTabs = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });

    window.setTimeout(updateScrollState, 250);
  };

  return (
    <div className="mt-8 md:mt-12">
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="no-scrollbar overflow-x-auto"
        >
          <div className="flex min-w-max items-center  gap-4 md:gap-8 px-1 py-3 md:gap-10 md:px-16">
            {categories.map((category, index) => {
              const isActive = index === 0;

              return (
                <button
                  key={`${category}-${index}`}
                  type="button"
                  className={`!rounded-none !bg-transparent !px-0 !py-0 whitespace-nowrap border-b-[3px] !text[14px] md:!text-[16px] !leading-none transition-colors ${
                    isActive
                      ? "pb-[20px] border-[#111827] !font-semibold !text-[#111827]"
                      : "pb-[10px] border-transparent !font-[500] !text-[#667085] hover:!text-[#111827]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollTabs("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D0D5DD] !bg-white !p-0 !text-[#667085] disabled:cursor-not-allowed ${
            canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollTabs("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D0D5DD] !bg-white !p-0 !text-[#667085] disabled:cursor-not-allowed ${
            canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ExproCategoryStrip;
