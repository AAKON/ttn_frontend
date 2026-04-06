"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useExproCategoryStrip } from "@/hooks/use-expro-category-strip";

const ExproCategoryStrip = ({
  categories = [],
  loading = false,
  selectedCategoryId = "all",
  onCategorySelect = () => { },
}) => {
  const {
    wrapperRef,
    barRef,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    stickyState,
    updateScrollState,
    scrollTabs,
  } = useExproCategoryStrip();

  const categoryItems = [{ id: "all", name: "All Categories" }, ...categories];
  const normalizedSelectedCategoryId = String(selectedCategoryId);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const activeButton = container.querySelector(
      `[data-category-id="${normalizedSelectedCategoryId}"]`
    );
    if (!(activeButton instanceof HTMLElement)) return;

    const containerWidth = container.clientWidth;
    const targetLeft =
      activeButton.offsetLeft - containerWidth / 2 + activeButton.offsetWidth / 2;

    const maxScrollLeft = Math.max(container.scrollWidth - containerWidth, 0);
    const nextScrollLeft = Math.min(Math.max(targetLeft, 0), maxScrollLeft);

    container.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }, [normalizedSelectedCategoryId, scrollRef]);

  return (
    <div
      ref={wrapperRef}
      className="mt-8 md:mt-12"
      style={stickyState.isPinned ? { height: `${stickyState.height}px` } : undefined}
    >
      <div
        ref={barRef}
        className={`border-b border-gray-200 transition-colors ${stickyState.isPinned
            ? "fixed z-10 bg-[#ffffff] shadow-sm lg:z-[100]"
            : "relative z-0 bg-transparent"
          }`}
        style={
          stickyState.isPinned
            ? {
              top: `${stickyState.top}px`,
              left: `${stickyState.left}px`,
              width: `${stickyState.width}px`,
            }
            : undefined
        }
      >
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="no-scrollbar overflow-x-auto"
          >
            <div className={`flex min-w-max items-center gap-4 md:gap-8 px-1 md:gap-10 md:px-2 ${stickyState.isPinned ? "pt-4" : "py-0"
              }`}>
              {categoryItems.map((category, index) => {
                const isActive = String(category.id) === normalizedSelectedCategoryId;

                return (
                  <button
                    key={`${category.id}-${index}`}
                    type="button"
                    data-category-id={String(category.id)}
                    disabled={loading}
                    onClick={() => onCategorySelect(category.id)}
                    className={`!rounded-none !bg-transparent !px-0 !py-0 !pb-4 whitespace-nowrap border-b-[3px] !text[14px] md:!text-[15px] !leading-none transition-colors ${isActive
                        ? "pb-[10px] border-[#111827] !font-semibold !text-[#111827]"
                        : "pb-[10px] border-transparent !font-[400] !text-[#667085] hover:!text-[#111827]"
                      }`}
                  >
                    {category.name}
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
            className={`absolute left-0 top-1/2 z-0 lg:z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D0D5DD] !bg-white !p-0 !text-[#667085] disabled:cursor-not-allowed ${canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollTabs("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 z-0 lg:z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D0D5DD] !bg-white !p-0 !text-[#667085] disabled:cursor-not-allowed ${canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExproCategoryStrip;
