"use client";
import { Section, SectionHeading } from "@/shared";
import CompanyCard from "./company-card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/companySlider.css";
import Button from "@/components/shared/button";

import businessLogo_1 from "@/assets/business-logo-2.png";

const RecentCompany = () => {
  // all company data is here
  const data = [
    {
      id: 1,
      name: "Central Park",
      image: businessLogo_1,
      location: "New York, USA",
      category: "Park",
    },
    {
      id: 2,
      name: "Eiffel Tower",
      image: businessLogo_1,
      location: "Paris, France",
      category: "Landmark",
    },
    {
      id: 3,
      name: "Tokyo Tower",
      image: businessLogo_1,
      location: "Tokyo, Japan",
      category: "Landmark",
    },
    {
      id: 4,
      name: "Sydney Opera House",
      image: businessLogo_1,
      location: "Sydney, Australia",
      category: "Theater",
    },
    {
      id: 5,
      name: "Great Wall of China",
      image: businessLogo_1,
      location: "Beijing, China",
      category: "Historical Site",
    },
    {
      id: 6,
      name: "Mount Fuji",
      image: businessLogo_1,
      location: "Honshu, Japan",
      category: "Mountain",
    },
  ];
  const options = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: false,
    padding: "4rem",
    breakpoints: {
      1024: {
        perPage: 3,
        padding: "5",
      },
      768: {
        perPage: 2,
        padding: "4.5",
      },
      640: {
        perPage: 1,
        padding: "3.5rem",
      },
    },
  };

  return (
    <Section id={"company-slider"} className={"bg-gray-50"}>
      {/* heading */}
      <SectionHeading
        heading={"Recently Added"}
        description={
          "Boost Your Business Globally with Our Free Business Listings"
        }
      />

      {/* all company */}
      <div className="pt-12">
        <Splide className="company-slider" options={options}>
          {data?.map((item) => (
            <SplideSlide key={item.id}>
              <CompanyCard item={item} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className="flex items-center justify-center pt-6 md:pt-12">
        <Button icon primaryOutline>
          Add Company for Free
        </Button>
      </div>
    </Section>
  );
};

export default RecentCompany;
