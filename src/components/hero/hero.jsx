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
import Button from "../ui/button";
export function SelectBox({ className = "" }) {
  return (
    <Select className={className}>
      <SelectTrigger className="text-gray-700 font-semibold text-sm leading-5 w-[180px] border-border focus:ring-0 focus:ring-offset-0 focus:ring-offset-none">
        <SelectValue
          placeholder="All Categories"
          className="text_16 text-red-400"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex gap-2 items-center">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 2.04819C11.7108 1.80032 10.871 1.66669 10 1.66669C5.39765 1.66669 1.66669 5.39765 1.66669 10C1.66669 14.6024 5.39765 18.3334 10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10C18.3334 8.57058 17.9734 7.2252 17.3393 6.04956M14.1667 4.79169H14.1709M8.75007 18.2402L8.75015 16.4041C8.75016 16.3047 8.78574 16.2085 8.85046 16.133L10.9219 13.7162C11.0922 13.5176 11.0394 13.2131 10.8123 13.0833L8.43213 11.7231C8.36746 11.6862 8.31388 11.6326 8.27697 11.5679L6.7254 8.84888C6.64465 8.70737 6.48883 8.62591 6.32655 8.64036L1.72017 9.05064M17.5 5.00002C17.5 6.84097 15.8334 8.33335 14.1667 10C12.5 8.33335 10.8334 6.84097 10.8334 5.00002C10.8334 3.15907 12.3257 1.66669 14.1667 1.66669C16.0076 1.66669 17.5 3.15907 17.5 5.00002ZM14.375 4.79169C14.375 4.90675 14.2817 5.00002 14.1667 5.00002C14.0516 5.00002 13.9584 4.90675 13.9584 4.79169C13.9584 4.67663 14.0516 4.58335 14.1667 4.58335C14.2817 4.58335 14.375 4.67663 14.375 4.79169Z"
                stroke="#F7931E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Anywhere
          </SelectLabel>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Form Design

// label text
export function Tags({tagText}) {
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
