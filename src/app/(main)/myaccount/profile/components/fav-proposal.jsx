"use client";
import ProposalCardProfile from "./proposal-card-profile";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const FavProposal = ({ heading, type, onItemRemove, onFavoriteToggle, proposals }) => {
    let splideRef = null;
    const isDisabled = !proposals || proposals.length <= 2;

    const handlePrev = () => {
        if (splideRef && !isDisabled) splideRef.go("<");
    };

    const handleNext = () => {
        if (splideRef && !isDisabled) splideRef.go(">");
    };

    const options = {
        perPage: 2,
        perMove: 1,
        drag: 'free',
        pagination: false,
        heightRatio: 0.36,
        arrows: false,
        gap: 32,
        rewind: true,
        padding: { left: 0, right: 240 },
        breakpoints: {
            1040: {
                perPage: 2,
                gap: 18,
                padding: { left: 0, right: 40 }
            },
            768: {
                perPage: 1,
                gap: 18,
                padding: { left: 0, right: 40 }
            },
            640: {
                perPage: 1,
                gap: 0,
                padding: "0",
            },
        },
    };

    return (
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between gap-5 pb-9">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                    {heading} (<span>{proposals?.length}</span>)
                </h3>
                <div className="flex justify-end gap-3">
                    <button
                        className={`custom-arrow prev-arrow border border-gray-300 p-1 size-9 bg-white text-gray-900 transition-all group ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-600 hover:border-brand-600'}`}
                        onClick={handlePrev}
                        disabled={isDisabled}
                    >
                        <svg
                            width={8}
                            height={12}
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="!pointer-events-none"
                        >
                            <path
                                d="M6.5 11L1.5 6L6.5 1"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`stroke-gray-900 transition-all ${!isDisabled && 'group-hover:stroke-white'}`}
                            />
                        </svg>
                    </button>
                    <button
                        className={`custom-arrow next-arrow border border-gray-300 p-1 size-9 bg-white text-gray-900 transition-all group ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-600 hover:border-brand-600'}`}
                        onClick={handleNext}
                        disabled={isDisabled}
                    >
                        <svg
                            width={8}
                            height={12}
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="!pointer-events-none"
                        >
                            <path
                                d="M1.5 11L6.5 6L1.5 1"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`stroke-gray-900 transition-all ${!isDisabled && 'group-hover:stroke-white'}`}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {proposals && Array.isArray(proposals) && proposals.length > 0 && (
                <Splide
                    className="company-slider side_shadow_r"
                    options={options}
                    ref={(splide) => (splideRef = splide)}
                >
                    {proposals?.map((proposal) => (
                        <SplideSlide key={proposal.id}>
                            <ProposalCardProfile type={type} data={proposal} onItemRemove={onItemRemove} onFavoriteToggle={onFavoriteToggle} />
                        </SplideSlide>
                    ))}
                </Splide>
            )}
        </div>
    );
};

export default FavProposal;
