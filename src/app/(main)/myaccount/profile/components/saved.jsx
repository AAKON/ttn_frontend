"use client";
import Profile_pic from "@/assets/CodeBlue.svg";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CompanyCardSaved from "./company-card-saved";

const data = [
  {
    id: 1,
    thumbnail_url: Profile_pic,
    businessCategory: {
      id: 1,
      name: "Media & Marketing",
    },
    name: "Caseworks Pte Ltd",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    compliances: [
      { id: 1, name: "Fabric" },
      { id: 2, name: "Yarn" },
      { id: 3, name: "Washing" },
      { id: 4, name: "Printing" },
    ],
    location: {
      id: 1,
      name: "Singapore",
    },
  },
  {
    id: 2,
    thumbnail_url: Profile_pic,
    businessCategory: {
      id: 1,
      name: "Media & Marketing",
    },
    name: "Caseworks Pte Ltd",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    compliances: [
      { id: 1, name: "Fabric" },
      { id: 2, name: "Yarn" },
      { id: 3, name: "Washing" },
      { id: 4, name: "Printing" },
    ],
    location: {
      id: 1,
      name: "New York",
    },
  },
  {
    id: 3,
    thumbnail_url: Profile_pic,
    businessCategory: {
      id: 1,
      name: "Media & Marketing",
    },
    name: "Caseworks Pte Ltd",
    about:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    compliances: [
      { id: 1, name: "Fabric" },
      { id: 2, name: "Yarn" },
      { id: 3, name: "Washing" },
      { id: 4, name: "Printing" },
    ],
    location: {
      id: 1,
      name: "Bangalore",
    },
  },
];

const options = {
  type: "loop",
  perPage: data.length > 3 ? 3 : data.length || 0,
  perMove: 1,
  gap: "1rem",
  pagination: false,
  arrows: false,
  padding: "4rem",
  breakpoints: {
    1024: {
      perPage: 3,
      padding: "3rem",
    },
    768: {
      perPage: 2,
      padding: "1rem",
    },
    640: {
      perPage: 1,
      padding: "0",
    },
  },
};

const Saved = () => {
  let splideRef = null;
  const handlePrev = () => {
    if (splideRef) splideRef.go("<");
  };

  const handleNext = () => {
    if (splideRef) splideRef.go(">");
  };
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between gap-5 pb-9">
        <h3 className="text-sm md:text-lg font-semibold text-gray-900">
          Saved (<span>0</span>)
        </h3>
        <div className="flex justify-end gap-3">
          <button
            className="custom-arrow prev-arrow border border-gray-300 p-1 size-9 bg-white text-gray-900 hover:bg-brand-600 hover:border-brand-600 transition-all group"
            onClick={handlePrev}
          >
            <svg
              width={8}
              height={12}
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 11L1.5 6L6.5 1"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-gray-900 group-hover:stroke-white transition-all"
              />
            </svg>
          </button>
          <button
            className="custom-arrow next-arrow border border-gray-300 p-1 size-9 bg-white text-gray-900 hover:bg-brand-600 hover:border-brand-600 transition-all group"
            onClick={handleNext}
          >
            <svg
              width={8}
              height={12}
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 11L6.5 6L1.5 1"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-gray-900 group-hover:stroke-white transition-all"
              />
            </svg>
          </button>
        </div>
      </div>
      <Splide
        className="company-slider"
        options={options}
        ref={(splide) => (splideRef = splide)}
      >
        {data?.map((company) => (
          <SplideSlide key={company.id}>
            <CompanyCardSaved data={company} />
          </SplideSlide>
        ))}
      </Splide>
      {/* <CompanyCardProfile key={company.id} data={company} /> */}
    </div>
  );
};

export default Saved;
