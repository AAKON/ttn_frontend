"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import defaultImage from "@/assets/certificate.svg";

const options = {
  type: "loop",
  drag: "free",
  focus: "center",
  gap: "28px",
  arrows: false,
  pagination: false,
  perPage: 5,
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    414: {
      gap: "8px",
      perPage: 2,
    },
    620: {
      gap: "12px",
      perPage: 3,
    },
    1080: {
      gap: "16px",
      perPage: 4,
    },
  },
};

const ClientSlider = ({ slideItems, direction = "ltr", ...props }) => {
  return (
    <Splide
      options={{ ...options, direction }}
      extensions={{ AutoScroll }}
      className="overflow-y-visible w-[1000px]"
    >
      {slideItems?.map((item, index) => (
        <SplideSlide
          key={item?.id || index}
          className="overflow-y-visible"
          {...props}
        >
          <div
            key={item?.id}
            className={`size-[138px] flex items-center justify-center bg-white border border-gray-300`}
          >
            <Image
              width={138}
              height={138}
              src={item?.image_url ? item?.image_url : defaultImage}
              className="w-full h-full object-contain"
              alt={"company image"}
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default ClientSlider;
