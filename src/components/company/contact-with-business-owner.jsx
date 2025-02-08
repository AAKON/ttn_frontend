"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/shared/button";
import CodeBlue from "@/assets/CodeBlue.svg";
import EmailCard from "./email-card";
import ReportCard from "./report-card";
import {
  UsersCheckIcon,
  FlagPriorityIcon,
  ChevronDownIcon,
  FileDownloadIcon,
} from "@/icons";
import Link from "next/link";
import DownloadProfile from "@/app/(main)/company/[slug]/components/DownloadProfile";

const ContactWithBusinessOwner = ({ headerData, profileData }) => {
  const [Owner, setOwner] = useState(false);
  const [email, setEmail] = useState(false);
  const [report, setReport] = useState(false);

  const { name, profileImage, company_id, tags } = headerData;

  const emailClick = () => {
    setEmail(true);
  };
  const reportClick = () => {
    setReport(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl relative">
      <button
        onClick={() => setOwner(!Owner)}
        className="lg:text-lg w-full flex justify-between items-center lg:text-brand-600 font-semibold lg:py-0 lg:px-0 lg:bg-transparent text-white px-4 py-3 text-base"
      >
        Contact with Company
        <span className={`lg:hidden p-0 ${Owner ? "rotate-180" : "rotate-0"} `}>
          <ChevronDownIcon width={12} height={6} stroke="#ffffff" />
        </span>
      </button>

      <div className={`lg:block ${Owner ? "block" : "hidden"}`}>
        <div className="flex items-center mt-[32px] mb-4 gap-3.5">
          <div className="size-10 rounded-full border overflow-hidden">
            <Image
              className="size-full object-cover"
              src={profileImage ? profileImage : CodeBlue}
              alt="CodeBlue"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-gray-900 text-base leading-base font-semibold">
              {name}
            </h3>
            <h6 className="text-gray-600 text-sm leading-sm font-normal line-clamp-1">
              {tags}
            </h6>
          </div>
        </div>

        {/* <div className="flex flex-col gap-[4px] items-center">
          <h4 className="flex gap-[8px] text-xl text-gray-900 font-medium leading-[30px]">
            <UsersCheckIcon />
          </h4>
          <h4 className="flex gap-[8px] text-xs text-gray-400 font-medium leading-[30px]">
            Talents
          </h4>
        </div> */}

        <Button
          // TagName={Link}
          onClick={emailClick}
          className="w-full text-center lg:text-lg font-semibold lg:mt-7 mt-4 text-white px-4 py-3 text-base"
        >
          Email us
        </Button>

        {/*<Button*/}
        {/*  secondary*/}
        {/*  className="w-full text-center lg:text-lg mt-4 px-4 py-3 "*/}
        {/*>*/}
        {/*  Send inquiry*/}
        {/*</Button>*/}

        <div className="flex justify-center flex-wrap gap-4 md:gap-[24px] mt-[16px]">
          <h3
            className="text-gray-500 text-[14px] flex items-center gap-[4px] cursor-pointer"
            onClick={reportClick}
          >
            <FlagPriorityIcon />
            <p className="text-gray-500 text-[14px] border-b border-gray-500">
              Report this listing
            </p>
          </h3>

          <DownloadProfile profileData={profileData} />
        </div>
      </div>

      <div
        className={`w-full absolute top-0 left-0 ${email ? "block" : "hidden"}`}
      >
        <EmailCard setemail={setEmail} companyId={company_id} />
      </div>

      <div
        className={`w-full absolute top-0 left-0 ${
          report ? "block" : "hidden"
        }`}
      >
        <ReportCard setreport={setReport} companyId={company_id} />
      </div>
    </div>
  );
};

export default ContactWithBusinessOwner;
