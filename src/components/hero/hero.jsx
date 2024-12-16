"use client";
import React from "react";
import { Container } from "@/shared";
import HeroForm from "./hero-form";

const Hero = () => {
  return (
    <section className="pt-[88px] md:pt-[208px] md:pb-[120px] bg-cover bg-center bg-no-repeat bg-hero-image">
      <Container>
        <div className="max-w-[1096px] mx-auto py-10 md:py-[70px]">
          <div className="text-center pb-4 md:pb-10">
            <h1 className="text-2xl md:text-[48px]">
              Find Your{" "}
              <TextAnimator
                className={"text-primary"}
                cursorColor={"text-brand-600"}
              />{" "}
              Needs
            </h1>
          </div>
          <HeroForm />
          <div className="mt-10 flex justify-center items-center gap-3 md:gap-6 flex-wrap">
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

// SELECT ITEM COMPONENT
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/shared/button";
import { WorldMap } from "@/icons";
import TextAnimator from "./text-animatior";

const country = ["Anywhere", "Africa", "Bangladesh", "india", "nepal", "chin"];
const categories = [
  "All category",
  "Manufacturingory",
  "Machinery",
  "Trading/Buying",
  "Advisor/Consultant",
  "Certifications",
  "Solution",
];

export function Categories({ className = "" }) {
  return (
    <Select className={className}>
      <SelectTrigger className="text-gray-700 font-semibold text-sm leading-5 w-[180px] border-none border-r border-r-gray-300 focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent">
        <SelectValue
          placeholder="All Categories"
          className="text_16 text-red-400"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex gap-2 items-center">
            All Categories
          </SelectLabel>
          {categories?.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function Country({ className = "" }) {
  return (
    <Select className={className}>
      <SelectTrigger
        className={`text-gray-700 font-semibold text-sm leading-5 w-[180px] border-border focus:ring-0 focus:ring-offset-0 focus:ring-offset-none relative pl-11`}
      >
        <span className="absolute top-0 translate-y-1/2  left-[18px] z-0">
          <WorldMap />
        </span>
        <SelectValue placeholder="Anywhere" className="text_16 text-red-400" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex gap-2 items-center">
            Anywhere
          </SelectLabel>
          {country?.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

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
