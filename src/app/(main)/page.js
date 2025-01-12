import Hero from "@/components/hero/hero";
import Counter from "@/components/counter/counter";
import SocialSlider from "@/components/social-slider/social-slider";
import BusinessArea from "@/components/business-area/business-area";
import RecentCompany from "@/components/recent-company-add/recent-company";
import GlobalSourcing from "@/components/global-sourcing/global-sourcing";
import GlobalMarket from "@/components/global-market/global-market";
import Resources from "@/components/resources/resources";
import GetInTouch from "@/components/get-in-touch/get-in-touch";
import React, {Fragment, Suspense} from "react";
import { Empty, Section } from "@/shared";
import ErrorMessage from "@/components/shared/errormessage";
import { getHomeDetails } from "@/services/home";
import { getBlogTTNS } from "@/services/blogs";
import MarqueeSlide from "@/components/marquee-sliders/marquee-slide";
import {GlobalSkeleton} from "@/components/shared/skelton/globalSkeleton";

export default async function Home() {
  try {
      const [blogs, details] = await Promise.all([
          getBlogTTNS(),
          getHomeDetails()
      ]);

    const recentCompanies = details?.companies || [];
    const partners = details?.partners || [];
    const categories = details?.categories || [];
    const locations = details?.locations || [];
    const webAds = details?.webAds || [];

    return (
        <Suspense fallback={<GlobalSkeleton />}>
            <Hero categories={categories} locations={locations} />
            <Counter />
            <Fragment>
                {webAds && Array.isArray(webAds) && webAds.length > 0 ? (
                    <SocialSlider webAds={webAds} />
                ) : (
                    <Empty message="No webAds found." />
                )}
            </Fragment>
            <RecentCompany data={recentCompanies} />
            <BusinessArea />
            <Section className="bg-gray-50">
                <h3 className="pb-8 font-medium text-gray-900 uppercase text-xl text-center">
                    We’ve worked with some great Companies
                </h3>
                <MarqueeSlide slideItems={partners} />
            </Section>
            <GlobalSourcing />
            <GlobalMarket />
            <Resources blogsPromise={blogs} />
            <GetInTouch />
        </Suspense>
    );
  } catch (error) {
    return <ErrorMessage message={error?.message} />;
  }
}
