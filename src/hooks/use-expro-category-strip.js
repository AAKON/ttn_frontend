"use client";

import { useEffect, useRef, useState } from "react";

export function useExproCategoryStrip() {
  const wrapperRef = useRef(null);
  const barRef = useRef(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [stickyState, setStickyState] = useState({
    isPinned: false,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const updateScrollState = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1
    );
  };

  useEffect(() => {
    const updateStickyState = () => {
      const wrapper = wrapperRef.current;
      const bar = barRef.current;
      if (!wrapper || !bar) return;

      const headerHeight = window.innerWidth >= 1024 ? 88 : 76;
      const topOffset = window.scrollY > 100 ? headerHeight : 0;
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperTop = window.scrollY + wrapperRect.top;
      const isPinned = window.scrollY + topOffset >= wrapperTop;

      const nextState = {
        isPinned,
        top: topOffset,
        left: Math.round(wrapperRect.left),
        width: Math.round(wrapperRect.width),
        height: Math.round(bar.offsetHeight),
      };

      setStickyState((prevState) => {
        if (
          prevState.isPinned === nextState.isPinned &&
          prevState.top === nextState.top &&
          prevState.left === nextState.left &&
          prevState.width === nextState.width &&
          prevState.height === nextState.height
        ) {
          return prevState;
        }

        return nextState;
      });
    };

    updateScrollState();
    updateStickyState();

    window.addEventListener("resize", updateScrollState);
    window.addEventListener("resize", updateStickyState);
    window.addEventListener("scroll", updateStickyState, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
      updateStickyState();
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    if (barRef.current) {
      resizeObserver.observe(barRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScrollState);
      window.removeEventListener("resize", updateStickyState);
      window.removeEventListener("scroll", updateStickyState);
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

  return {
    wrapperRef,
    barRef,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    stickyState,
    updateScrollState,
    scrollTabs,
  };
}
