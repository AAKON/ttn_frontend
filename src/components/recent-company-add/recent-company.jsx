"use client";
import {Section, SectionHeading} from "@/shared";
import CompanyCard from "./company-card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/companySlider.css";
import Button from "../ui/button";

import businessLogo_1 from "@/assets/business-logo-2.png"

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
        padding: "3rem",
      },
      768: {
        perPage: 2,
        padding: "2rem",
      },
      640: {
        perPage: 1,
        padding: "1rem",
      },
    },
  };

  return (
    <Section  id={"company-slider"}>
        {/* heading */}
        <SectionHeading heading={"Recently Added"} description={"Boost Your Business Globally with Our Free Business Listings"}/>

        {/* all company */}
        <div >
          <Splide
              className="company-slider"
              options={options}
          >
            {data?.map((item) => (
                <SplideSlide key={item.id}>
                  <CompanyCard item={item}/>
                </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="flex items-center justify-center pt-12">
          <Button className="bg-transparent px-6 border-2 border-brand-300 text-brand-600">
            Add Company Free
          </Button>
        </div>
    </Section>
  );
};

export default RecentCompany;
