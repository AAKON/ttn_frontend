"use client";
import { Section, SectionHeading } from "@/shared";
import CompanyCard from "./company-card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/companySlider.css";
import Button from "@/components/shared/button";
import businessLogo_1 from "@/assets/business-logo-2.png";
import Link from "next/link";
import "./company-slider.css"

const RecentCompany = ({ data }) => {
  const options = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: true,
    padding: "4rem",
    drag: true,
    snap: true,
    breakpoints: {
      1600: {
        padding: "9rem",
      },
      1300: {
        padding: "3rem",
      },
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
      {data && Array.isArray(data) && data.length > 0 && (
        <div className="mt-6 md:pt-12">
          <Splide className="company-slider" options={options}>
            {data?.map((item) => (
              <SplideSlide key={item.id}>
                <CompanyCard item={item} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
      <div className="flex items-center justify-center pt-6 md:pt-12">
        <Button
          TagName={Link}
          href="/myaccount/company/add"
          icon
          primaryOutline
        >
          Add Company for Free
        </Button>
      </div>
    </Section>
  );
};

export default RecentCompany;
