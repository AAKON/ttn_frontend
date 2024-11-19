"use client"
import Hero from "@/components/hero/hero";
import Counter from "@/components/counter/counter";
import SocialSlider from "@/components/social-slider/social-slider";
import BusinessArea from "@/components/business-area/business-area";
import RecentCompany from "@/components/recent-company-add/recent-company";
import Company from "@/components/company/company";
import GlobalSourcing from "@/components/global-sourcing/global-sourcing";
import GlobalMarket from "@/components/global-market/global-market";
import Resources from "@/components/resources/resources";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import {Fragment} from "react";
export default function Home() {

  return (
    <>
      <Hero />
      <Counter />
      <Fragment>
        <SocialSlider />
      </Fragment>
      <BusinessArea />
      <RecentCompany />
      <Company/>
      <GlobalSourcing/>
      <GlobalMarket />
      <Resources />
      <GetInTouch />
    </>
  );
}
