"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ExproDetailsContent = ({ expro }) => {
    const galleryImages = Array.isArray(expro?.galleryImages) ? expro.galleryImages : [];
    const expoTags = React.useMemo(() => {
        const possibleSources = [
            expro?.tags,
            expro?.expo_tags,
            expro?.tag_list,
            expro?.tag_names,
            expro?.business_tags,
        ];

        const possibleTags = possibleSources.find((item) => {
            if (Array.isArray(item)) return item.length > 0;
            if (Array.isArray(item?.data)) return item.data.length > 0;
            if (typeof item === "string") return item.trim().length > 0;
            return false;
        });

        const tagsAsArray = Array.isArray(possibleTags)
            ? possibleTags
            : Array.isArray(possibleTags?.data)
                ? possibleTags.data
                : typeof possibleTags === "string"
                    ? possibleTags.split(",")
                    : [];

        const normalized = tagsAsArray
            .map((tag) => {
                if (typeof tag === "string") return tag.trim();
                if (tag && typeof tag === "object") {
                    return (tag.name || tag.title || tag.label || tag.tag || tag.value || "").toString().trim();
                }
                return "";
            })
            .filter(Boolean);

        return normalized.filter(
            (tag, index) => normalized.findIndex((item) => item.toLowerCase() === tag.toLowerCase()) === index
        );
    }, [expro]);

    const [previewIndex, setPreviewIndex] = React.useState(null);

    const isPreviewOpen = previewIndex !== null && Boolean(galleryImages[previewIndex]);
    const activeImage = previewIndex !== null ? galleryImages[previewIndex] : null;

    const handleOpenPreview = (index) => {
        setPreviewIndex(index);
    };

    const handleClosePreview = () => {
        setPreviewIndex(null);
    };

    const handlePrev = () => {
        if (galleryImages.length <= 1 || previewIndex === null) return;
        setPreviewIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const handleNext = () => {
        if (galleryImages.length <= 1 || previewIndex === null) return;
        setPreviewIndex((prev) => (prev + 1) % galleryImages.length);
    };

    React.useEffect(() => {
        if (previewIndex === null) return;

        if (galleryImages.length === 0 || previewIndex > galleryImages.length - 1) {
            setPreviewIndex(null);
        }
    }, [galleryImages, previewIndex]);

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
                                type="button"
                                key={image.id || idx}
                                onClick={() => handleOpenPreview(idx)}
                                className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 text-left"
                                aria-label={`Preview gallery image ${idx + 1}`}
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

            <div className="!mt-0 bg-white rounded-2xl p-2 lg:p-4">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-[16px] font-semibold text-[#1D2939]">
                        Tags :
                    </h2>

                    {expoTags.length > 0 ? (
                        expoTags.map((tag, index) => (
                            <span
                                key={`${tag}-${index}`}
                                className="inline-flex items-center rounded-[10px] bg-[#F2F4F7] px-4 py-2 text-base leading-none text-[#475467]"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#667085] italic">No tags found.</p>
                    )}
                </div>
            </div>

            <Dialog open={Boolean(isPreviewOpen)} onOpenChange={(open) => !open && handleClosePreview()}>
                <DialogContent className="w-[calc(100%-24px)] max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white [&>button]:p-1.5 [&>button]:opacity-100 [&>button:hover]:bg-black/70">
                    <DialogTitle className="sr-only">Gallery preview</DialogTitle>

                    {activeImage ? (
                        <div className="relative overflow-hidden rounded-2xl bg-black">
                            <img
                                src={activeImage.src}
                                alt={activeImage.alt || "Gallery preview"}
                                className="mx-auto max-h-[82vh] w-full object-contain"
                            />

                            {galleryImages.length > 1 ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            ) : null}
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ExproDetailsContent;
