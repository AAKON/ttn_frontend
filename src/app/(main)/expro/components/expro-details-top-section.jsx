"use client";

import React from "react";
import Image from "next/image";
import {
    MapPin,
    Calendar,
    Clock,
    ExternalLink,
    Eye,
    Share2,
    Bookmark,
} from "lucide-react";

const ExproDetailsTopSection = ({ expro }) => {
    const hasBannerImage = Boolean(expro?.banner_url || expro?.imageUrl);
  console.log({expro});
  
    // Mock data for countdown (replace with actual logic if needed)
    const countdown = [
        { label: "Days", value: "1" },
        { label: "Hours", value: "10" },
        { label: "Minutes", value: "30" },
        { label: "Seconds", value: "20" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-6 md:gap-8">
                {/* Left Side: Banner Image */}
                <div className="w-full lg:w-[565px] flex-shrink-0">
                    <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-gray-100">
                        {hasBannerImage ? (
                            <Image
                                src={expro.banner_url}
                                alt={expro.title || "Expo banner"}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 565px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 flex flex-col justify-center p-8 text-white">
                                <p className="text-xs font-semibold opacity-90 uppercase tracking-wider mb-2">
                                    16th Intex
                                </p>
                                <h2 className="text-4xl font-bold leading-tight">intex</h2>
                                <p className="text-[10px] uppercase mt-2 max-w-[150px]">
                                    The Premier International Textiles Sourcing Show of South Asia
                                </p>
                                <div className="mt-auto">
                                    <p className="text-sm font-bold uppercase">Bangladesh</p>
                                    <p className="text-xs">25-26-27 June, 2025</p>
                                    <p className="text-[10px] opacity-80 mt-1">ICCB, Dhaka</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Information */}
                <div className="flex-1 flex flex-col pt-2">
                    {/* Top Line: Organizer & Views */}
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[14px] md:text-lg text-gray-600">
                            Event By <br className="md:hidden" /> <span className="text-[#1570EF] font-[14px] md:font-medium cursor-pointer hover:underline">{expro?.organizer || "Unknown Organizer"}</span>
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1570EF] text-white text-xs font-medium">
                            <Eye className="h-3.5 w-3.5" />
                            25 Views
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl md:text-[28px] font-bold text-[#101828] leading-tight mb-3 max-w-2xl">
                        {expro.title}
                    </h1>

                    {/* Metadata */}
                    <div className="space-y-1 mb-2">
                        <div className="flex items-center gap-2.5 text-[#475467] text-[14px] md:text-[15px]">
                            <MapPin className="h-4 w-4 text-[#667085] flex-shrink-0" />
                            <span>{expro.location || "Guangzhou Exhibition Centre, Guangzhou, China"}</span>
                            <ExternalLink className="h-3 w-3 text-[#2E90FA] cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-2.5 text-[#475467] text-[14px] md:text-[15px]">
                            <Calendar className="h-4 w-4 text-[#667085] flex-shrink-0" />
                            <span>{expro.dateRange || "7 Feb, 2026 (Tuesday) - 9 Feb, 2026 (Thursday)"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[#475467] text-[14px] md:text-[15px]">
                            <Clock className="h-4 w-4 text-[#667085] flex-shrink-0" />
                            <span>10:00 AM - 05:00 PM</span>
                        </div>
                    </div>

                    {/* Bottom Row: Countdown & Actions */}
                    <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
                        {/* Countdown */}
                        <div className="flex gap-2.5">
                            {countdown.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center bg-[#FFFAEB] border border-[#FEF0C7] p-1 rounded-lg ">
                                    <div className="w-10 md:w-14 flex items-center justify-center text-[#B54708] font-medium text-lg">
                                        {item.value}
                                    </div>
                                    <span className=" text-[10px] font-normal text-[#667085] uppercase tracking-wider">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center justify-center h-12 w-12 border border-[#D0D5DD] rounded-xl hover:bg-gray-50 transition-colors">
                                <Share2 className="h-4 w-5 text-[#344054]" />
                            </button>
                            <button className="flex items-center justify-center h-12 w-12 border border-[#D0D5DD] rounded-xl hover:bg-gray-50 transition-colors">
                                <Bookmark className="h-5 w-5 text-[#344054]" />
                            </button>
                            <button className="flex-1 md:flex-none px-10 h-12 bg-[#ED8A19] text-white font-bold rounded-xl hover:bg-[#da7f18] transition-colors shadow-sm">
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExproDetailsTopSection;
