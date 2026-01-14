"use client";
import {Section} from "@/shared";
import Image from "next/image";
import arrow from "@/assets/arrow.png";
import Forms from "@/components/shared/form";

const GetInTouch = () => {
  return (
    <Section className="bg-gray-50">
      <div className="flex flex-col md:flex-row relative gap-x-8 items-center justify-between">
        {/* arrow */}
        <Image
          id="arrowImage"
          src={arrow}
          alt="arrow"
          className="w-[300px] hidden max-[1432px]:w-[243px] xl:block absolute  top-[56%] left-[27%]"
        />
        {/* left */}
        <div>
          <h3 className="text-2xl hidden lg:block xl:text-3xl font-normal max-w-[683px] text-gray-900 pb-4 max-[1432px]:!text-[30px] xl:pb-6">
            We empowering business networking that{" "}
            <span className="font-semibold">
              can help develop business growth.
            </span>
          </h3>
          <h3 className="text-2xl lg:hidden lg:text-4xl font-normal max-w-[683px] text-gray-900 pb-4 xl:pb-6">
            Go Global. Get Discovered. <br />
            <span className="font-semibold">Grow Your Apparel Business.</span>
          </h3>
          <p className="font-normal text-sm xl:text-xl text-gray-500 max-w-[480px]">
            Leading apparel and textile industry-based business promotion and
            networking platform.
          </p>
          <div className="h-28"></div>
          {/* star */}
          {/*<div className="flex pt-4 xl:pt-12 gap-x-4">*/}
          {/*  <div>*/}
          {/*    <div className="relative w-[152px] flex">*/}
          {/*      <div className="w-[40px] border-2 border-white h-[40px] rounded-full overflow-hidden">*/}
          {/*        <Image*/}
          {/*          src={avatar}*/}
          {/*          alt="avatar"*/}
          {/*          className="w-full h-full object-cover"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="absolute left-[28px] w-[40px] border-2 border-white h-[40px] rounded-full overflow-hidden">*/}
          {/*        <Image*/}
          {/*          src={avatar}*/}
          {/*          alt="avatar"*/}
          {/*          className="w-full h-full object-cover"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="absolute left-[56px] w-[40px] border-2 border-white h-[40px] rounded-full overflow-hidden">*/}
          {/*        <Image*/}
          {/*          src={avatar}*/}
          {/*          alt="avatar"*/}
          {/*          className="w-full h-full object-cover"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="absolute left-[84px] w-[40px] border-2 border-white h-[40px] rounded-full overflow-hidden">*/}
          {/*        <Image*/}
          {/*          src={avatar}*/}
          {/*          alt="avatar"*/}
          {/*          className="w-full h-full object-cover"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="absolute right-0 w-[40px] border-2 border-white h-[40px] rounded-full overflow-hidden">*/}
          {/*        <Image*/}
          {/*          src={avatar}*/}
          {/*          alt="avatar"*/}
          {/*          className="w-full h-full object-cover"*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <div className="flex items-center gap-x-2">*/}
          {/*      <div className="flex items-center gap-x-1">*/}
          {/*        {Array.apply(null, Array(5)).map((item, index) => {*/}
          {/*          return <Image src={star} key={index} alt="star" />;*/}
          {/*        })}*/}
          {/*      </div>*/}
          {/*      <span className="font-semibold text-base text-gray-900">*/}
          {/*        5.0*/}
          {/*      </span>*/}
          {/*    </div>*/}
          {/*    <h3 className="font-medium text-base text-gray-500">*/}
          {/*      from 200+ reviews*/}
          {/*    </h3>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {/* right */}
        <Forms />
      </div>
    </Section>
  );
};

export default GetInTouch;
