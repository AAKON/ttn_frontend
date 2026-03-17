"use client";

import React from "react";

const ExproDetailsContent = ({ expro }) => {
    const galleryImages = Array.isArray(expro?.galleryImages) ? expro.galleryImages : [];

    return (
        <div className="space-y-6">
            {/* Expo Details Card */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 lg:p-8 shadow-sm">
                <h2 className="text-sm font-semibold text-[#667085] uppercase tracking-wider mb-6">
                    Expo Details
                </h2>

                <div
                    className="rich-text-content text-[#475467] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: expro?.description || "No description available." }}
                />

                {/* <style jsx global>{`
                    .rich-text-content h1 { font-size: 2rem; font-weight: 700; color: #101828; margin-bottom: 1rem; margin-top: 1.5rem; }
                    .rich-text-content h2 { font-size: 1.5rem; font-weight: 700; color: #101828; margin-bottom: 0.75rem; margin-top: 1.25rem; }
                    .rich-text-content h3 { font-size: 1.25rem; font-weight: 700; color: #101828; margin-bottom: 0.5rem; margin-top: 1rem; }
                    .rich-text-content p { margin-bottom: 1rem; }
                    .rich-text-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                    .rich-text-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                    .rich-text-content li { margin-bottom: 0.25rem; }
                    .rich-text-content strong { font-weight: 600; color: #101828; }
                    .rich-text-content a { color: #1570EF; text-decoration: underline; }
                `}</style> */}
            </div>

            {/* Gallery Card */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 lg:p-8 shadow-sm">
                <h2 className="text-sm font-semibold text-[#667085] uppercase tracking-wider mb-6">
                    Gallery
                </h2>

                {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                        {galleryImages.map((image, idx) => (
                            <div
                                key={image.id || idx}
                                className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-[#667085] italic">No gallery images found.</p>
                )}
            </div>
        </div>
    );
};

export default ExproDetailsContent;
