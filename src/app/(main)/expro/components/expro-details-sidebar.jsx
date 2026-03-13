"use client";

import React from "react";
import Link from "next/link";
import { Building2, MapPin, ExternalLink, ChevronRight } from "lucide-react";

const SimilarExproCard = ({ expro }) => (
    <div className="group border border-[#EAECF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
        <div className="relative aspect-[16/9] bg-gray-100">
            {/* Fallback pattern if no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">{expro.posterWord || "Expro"}</span>
            </div>
        </div>
        <div className="p-4">
            <p className="text-xs font-semibold text-[#667085] mb-2">{expro.dateRange}</p>
            <h4 className="text-sm font-bold text-[#101828] mb-3 line-clamp-2 leading-tight group-hover:text-[#1570EF] transition-colors">
                {expro.title}
            </h4>
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#475467]">
                    <MapPin className="h-3.5 w-3.5 text-[#667085]" />
                    <span>{expro.country}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#475467]">
                    <Building2 className="h-3.5 w-3.5 text-[#667085]" />
                    <span>{expro.organizer}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button className="py-2 text-xs font-semibold border border-[#D0D5DD] rounded-lg hover:bg-gray-50 transition-colors">
                    Register Now
                </button>
                <button className="py-2 text-xs font-semibold border border-[#ED8A19] text-[#ED8A19] rounded-lg hover:bg-[#FFFAEB] transition-colors">
                    View Details
                </button>
            </div>
        </div>
    </div>
);

const ExproDetailsSidebar = ({ similarExpros = [] }) => {
    return (
        <div className="space-y-6">
            {/* Reminder Widget */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#101828] mb-2">
                    Get Upcoming Expo Reminder?
                </h3>
                <p className="text-sm text-[#475467] mb-6">
                    Enter your email to get the latest updates about the upcoming fairs & events!
                </p>

                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 h-11 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1570EF] focus:ring-1 focus:ring-[#1570EF] transition-all text-sm"
                        />
                        <button className="px-5 h-11 bg-[#ED8A19] text-white font-semibold rounded-lg hover:bg-[#da7f18] transition-colors text-sm whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-[12px] text-[#667085]">
                        We care about your data in our <Link href="#" className="underline hover:text-[#101828]">privacy policy</Link>.
                    </p>
                </form>
            </div>

            {/* Similar Expo Widget */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#101828]">Similar Expo</h3>
                    <Link href="/expro" className="text-sm font-semibold text-[#1570EF] hover:underline">
                        View All
                    </Link>
                </div>

                <div className="space-y-4">
                    {similarExpros.length > 0 ? (
                        similarExpros.map((expro, idx) => (
                            <SimilarExproCard key={idx} expro={expro} />
                        ))
                    ) : (
                        <p className="text-sm text-[#667085] italic">No similar events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExproDetailsSidebar;
