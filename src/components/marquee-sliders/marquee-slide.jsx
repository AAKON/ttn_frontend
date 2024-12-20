"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import defaultImage from "@/assets/certificate.svg";
import Link from "next/link";

const options = {
  type: "loop",
  drag: "free",
  focus: "center",
  gap: "28px",
  arrows: false,
  pagination: false,
  perPage: 8,
  // padding: { left: "20px", right: "20px" },
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    414: {
      gap: "8px",
      perPage: 3,
    },
    620: {
      gap: "12px",
      perPage: 5,
    },
    1080: {
      gap: "16px",
      perPage: 6,
    },
    1440: {
      gap: "20px",
      perPage: 7,
    },
  },
};

const MarqueeSlide = ({ slideItems, direction = "ltr", ...props }) => {
  return (
    <Splide
      options={{ ...options, direction }}
      extensions={{ AutoScroll }}
      className="overflow-y-visible !max-w-[1400px]"
    >
      {slideItems?.map((item, index) => (
        <SplideSlide
          key={item?.id || index}
          className="overflow-y-visible"
          {...props}
        >
          <Link
            href={item?.link ? item?.link : "#"}
            key={item?.id}
            className={`size-[100px] flex items-center justify-center bg-white border border-gray-300`}
          >
            <Image
              width={100}
              height={100}
              src={item?.image ? item?.image : ""}
              className="w-full h-full object-contain"
              alt={"company image"}
            />
          </Link>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default MarqueeSlide;
