"use client";
import React from "react";
import { Container } from "@/shared";
import HeroForm from "./hero-form";

const Hero = () => {
  return (
    <section className="pt-[116px] pb-10 md:pt-[216px] md:pb[120px] bg-cover bg-center bg-no-repeat bg-hero-image">
      <Container>
        <div>
          <div className="text-center md:py-10 md:px-[160px]">
            <h5 className="heading_5">Textile & Apparel B2B Network</h5>
            <h1 className="pt-1 pb-3">Find Your Business Needs</h1>
            <p className="text_18">
              The all-in-one platform connecting apparel & textile companies
              with global buyers for endless opportunities
            </p>
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
        <span className="absolute top-0 translate-y-1/2  left-[18px] z-20">
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
    <div className="flex gap-[6px] items-center rounded-md border-border px-[14px] py-2 text-white bg-black/20">
      <span>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#D0D5DD"
            strokeWidth={2}
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
