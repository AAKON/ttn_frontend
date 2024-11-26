"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import AwardsCard from "./awards-card";

// Awards Slide items
import award_1 from "@/assets/awards_1.png";
import award_2 from "@/assets/awards_2.png";
import award_3 from "@/assets/awards_3.png";
import award_4 from "@/assets/awards_4.png";
import award_5 from "@/assets/awards_5.png";
const allAwards = [
  {
    id: 1,
    image: award_1,
    title: "Clutch 2018",
    description: "B2B Companies of Bangladesh",
  },
  {
    id: 2,
    image: award_2,
    title: "Award 2",
    description: "B2B Companies of Bangladesh",
  },
  {
    id: 3,
    image: award_3,
    title: "Award 3",
    description: "B2B Companies of Bangladesh",
  },
  {
    id: 4,
    image: award_4,
    title: "Award 4",
    description: "B2B Companies of Bangladesh",
  },
  {
    id: 5,
    image: award_5,
    title: "Award 5",
    description: "B2B Companies of Bangladesh",
  },
  {
    id: 6,
    image: award_1,
    title: "Award 6",
    description: "B2B Companies of Bangladesh",
  },
];

const AwardsSlider = () => {
  const options = {
    type: "slide",
    autoplay: false,
    perPage: 5,
    perMove: 1,
    gap: 16,
    arrows: true,
    pagination: false,
    breakpoints: {
      1024: {
        perPage: 3,
      },
      768: {
        perPage: 2,
        arrows: false,
      },
      414: {
        perPage: 1,
        arrows: false,
      },
    },
  };

  return (
    <div>
      <div>
        <Splide options={options}>
          {allAwards.map((award, idx) => (
            <SplideSlide key={idx}>
              <AwardsCard cardData={award} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default AwardsSlider;
