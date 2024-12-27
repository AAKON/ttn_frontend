"use client";
import React from "react";
import { Container } from "@/shared";
import HeroForm from "./hero-form";

const Hero = ({ categories, locations }) => {
  return (
    <section className="pt-[76px] md:pt-[208px] md:pb-[120px] bg-cover bg-center bg-no-repeat bg-hero-image">
      <Container>
        <div className="max-w-[1096px] mx-auto py-10 md:py-[70px]">
          <div className="text-center pb-4 md:pb-10">
            <h1 className="hero-title sm:text-2xl lg:text-[44px] text-white leading-normal">
              Find Your{" "}
              <TextAnimator
                animationWordArray={[
                  "Apparel",
                  "Textile",
                  "Clothing",
                  "Fabric",
                ]}
                className={"text-primary"}
                cursorColor={"text-brand-600"}
              />
              Business Needs
            </h1>
          </div>
          <HeroForm categories={categories} locations={locations} />
          <div className="mt-4 md:mt-10 flex justify-center items-center gap-3 md:gap-6 flex-wrap">
            <Tags tagText="Sports Wear" />
            <Tags tagText="Hoodie" />
            <Tags tagText="Tops" />
            <Tags tagText="Cotton Yarn" />
          </div>
        </div>
      </Container>
    </section>
  );
};

import TextAnimator from "./text-animatior";

// Form Design

// label text
export function Tags({ tagText }) {
  return (
    <div className="text-sm flex gap-[6px] items-center rounded-md border-border px-[14px] py-2 text-white bg-black/20">
      <span>
        <svg
          width={17}
          height={18}
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16.5L12.375 12.875M14.3333 8.16667C14.3333 11.8486 11.3486 14.8333 7.66667 14.8333C3.98477 14.8333 1 11.8486 1 8.16667C1 4.48477 3.98477 1.5 7.66667 1.5C11.3486 1.5 14.3333 4.48477 14.3333 8.16667Z"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{tagText}</span>
    </div>
  );
}

export default Hero;
