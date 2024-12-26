"use client";
import { useState } from 'react';
import {ChevronDownIcon} from "@/icons";
import {ChevronDown, ChevronUp} from "lucide-react";

const AboutCompany = ({aboutData}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const previewText = aboutData && aboutData.split('. ').slice(0, 3).join('. ') + '.';
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">About Company</h2>
            <p className="text-base text-gray-800 font-normal mt-4">
                {/*<span className="max-sm:hidden sm:hidden lg:block">{aboutData}</span>*/}
                <span>{isExpanded ? aboutData : aboutData?.slice(0, 300) + "..."}</span>
            </p>
            <div className="text-sm text-brand-700 leading-sm font-semibold lg:mt-[18px] cursor-pointer flex items-end gap-2"
                 onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                    <>
                        See Less <ChevronUp className="w-5 h-5 stroke-current" />
                    </>
                ) : (
                    <>
                        See More <ChevronDown className="w-5 h-5 stroke-current" />
                    </>
                )}
            </div>
        </div>
    )
}

// Simulating server-side data fetching for SEO
export const getServerSideProps = async ({aboutData}) => {
    return {
        props: {
            aboutData,
        },
    };
};

export default AboutCompany