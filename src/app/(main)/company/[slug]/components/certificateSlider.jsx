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

const CertificateSlider = ({ slideItems, direction = "ltr", ...props }) => {
  return (
    <Splide
      options={{ ...options, direction }}
      extensions={{ AutoScroll }}
      className="overflow-y-visible !max-w-[934px]"
    >
      {slideItems?.map((item, index) => (
        <SplideSlide
          key={item?.id || index}
          className="overflow-y-visible"
          {...props}
        >
          <div className="h-[62px] flex justify-center flex-col items-center">
            <div className="size-9 flex items-center justify-center">
              <Image
                width={36}
                height={36}
                src={item?.image_url ? item?.image_url : defaultImage}
                className="w-full h-full object-contain"
                alt={item?.name || "image"}
              />
            </div>
            <span className="text-gray-500 text-sm">{item?.name}</span>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default CertificateSlider;
