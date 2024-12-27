"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AboutCompany = ({ aboutData }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Handle cases where aboutData is undefined or empty
    if (!aboutData || aboutData.trim() === "") {
        return <p className="text-base text-gray-800 font-normal mt-4">No information available about the company.</p>;
    }

    const shouldShowSeeMore = aboutData.length > 300;

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">About Company</h2>
            <p className="text-base text-gray-800 font-normal mt-4">
                <span>
                    {isExpanded || !shouldShowSeeMore
                        ? aboutData
                        : aboutData.slice(0, 300) + "..."}
                </span>
            </p>
            {shouldShowSeeMore && (
                <div
                    className="text-sm text-brand-700 leading-sm font-semibold lg:mt-[18px] cursor-pointer flex items-end gap-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
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
            )}
        </div>
    );
};

// Simulating server-side data fetching for SEO
export const getServerSideProps = async ({ aboutData }) => {
    return {
        props: {
            aboutData,
        },
    };
};

export default AboutCompany;
