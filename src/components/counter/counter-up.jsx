"use client";
import { useEffect, useRef, useState } from "react";

const CounterUp = ({ endValue, duration = 2000, endfix, role }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  // Ensure `endValue` is treated as a string before processing
  const numericValue = parseInt(String(endValue).replace(/[^0-9]/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isNaN(numericValue)) return;

    let start = 0;
    const increment = numericValue / (duration / 100);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isVisible, numericValue, duration]);

  // Format the number with commas
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <div
      ref={counterRef}
      className="xl:pl-4 pl-2 border-l-2 border-l-gray-200 "
    >
      <h5 className="font-medium text-xl xl:text-[30px] leading-tight text-brand-600 pb-2">
        {formatNumber(count)}{endfix}
      </h5>
      <p
        className={`text-gray-500 text-xs xl:text-base font-medium capitalize `}
      >
        {role ? role : "Partners"}
      </p>
    </div>
  );
};

export default CounterUp;
