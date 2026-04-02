"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    MapPin,
    Calendar,
    Clock,
    ExternalLink,
    Eye,
    Share2,
    Bookmark,
} from "lucide-react";
import { getDateTimestamp } from "@/utils/dateRange";
import ExpoRegistrationModal from "./expo-registration-modal";
import ShareModal from "@/components/company/share-modal";
import BookmarkCompany from "../../company/[slug]/components/bookmarkCompany";

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

const twoDigits = (value) => String(value).padStart(2, "0");
const isValidTimestamp = (value) => Number.isFinite(value) && !Number.isNaN(value);

const parseDateString = (value) => {
    if (!value) return null;

    const raw = String(value).trim();
    if (!raw) return null;

    const directParse = getDateTimestamp(raw);
    if (isValidTimestamp(directParse)) return directParse;

    const dmyMatch = raw.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
    if (dmyMatch) {
        const [, day, month, year] = dmyMatch;
        const isoLike = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`;
        const dmyParse = Date.parse(isoLike);
        if (isValidTimestamp(dmyParse)) return dmyParse;
    }

    return null;
};

const parseTimeString = (value) => {
    if (!value) return null;

    const raw = String(value).trim();
    if (!raw) return null;

    const match = raw.match(/^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?$/);
    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        Number.isNaN(seconds) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59 ||
        seconds < 0 ||
        seconds > 59
    ) {
        return null;
    }

    return { hours, minutes, seconds };
};

const formatExpoTime = (value) => {
    const parsed = parseTimeString(value);
    if (!parsed) return null;

    const date = new Date(Date.UTC(2000, 0, 1, parsed.hours, parsed.minutes, parsed.seconds));
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
    }).format(date);
};

const parseExpoTimestamp = (value, pickFromRange = "start") => {
    if (value === null || value === undefined) return null;

    if (typeof value === "number") {
        const normalized = value < 1e12 ? value * 1000 : value;
        return isValidTimestamp(normalized) ? normalized : null;
    }

    if (value instanceof Date) {
        const timestamp = value.getTime();
        return isValidTimestamp(timestamp) ? timestamp : null;
    }

    const raw = String(value).trim();
    if (!raw) return null;

    const directParse = parseDateString(raw);
    if (isValidTimestamp(directParse)) return directParse;

    const delimiter = raw.includes(" - ") ? " - " : raw.includes(" to ") ? " to " : null;
    if (!delimiter) return null;

    const parts = raw.split(delimiter).map((part) => part.trim()).filter(Boolean);
    if (parts.length === 0) return null;

    const targetPart = pickFromRange === "end" ? parts[parts.length - 1] : parts[0];
    return parseDateString(targetPart);
};

const ExproDetailsTopSection = ({ expro }) => {
    const searchParams = useSearchParams();
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false);
    const [nowTimestamp, setNowTimestamp] = React.useState(null);
    const [showStickyCountdown, setShowStickyCountdown] = React.useState(false);
    const sectionRef = React.useRef(null);

    const hasBannerImage = Boolean(expro?.banner_url || expro?.imageUrl);
    const organizerName = expro?.organizer || "Unknown Organizer";
    const companySlug = expro?.company_slug || expro?.company?.slug || expro?.company?.company_slug;
    const visitorRegUrl =
        expro?.visitor_reg_url ||
        expro?.visitor_registration_url ||
        expro?.registration_url ||
        expro?.reg_url ||
        "";
    const startTimeValue =
        expro?.start_time ||
        expro?.startTime ||
        expro?.from_time ||
        expro?.event_start_time ||
        "";
    const endTimeValue =
        expro?.end_time ||
        expro?.endTime ||
        expro?.to_time ||
        expro?.event_end_time ||
        "";
    const countdownStartValue = expro?.countdown_start || expro?.countdownStart;
    const countdownEndValue = expro?.countdown_end || expro?.countdownEnd;
    const locationLabel = expro?.location || "Guangzhou Exhibition Centre, Guangzhou, China";
    const shouldHideRegisterAction = searchParams.get("fromMyExpo") === "1";

    const countdownStartTimestamp = React.useMemo(
        () => parseExpoTimestamp(countdownStartValue, "start"),
        [countdownStartValue]
    );
    const countdownEndTimestamp = React.useMemo(
        () => parseExpoTimestamp(countdownEndValue, "end"),
        [countdownEndValue]
    );
    const hasCountdownSection = countdownStartTimestamp !== null;

    React.useEffect(() => {
        setNowTimestamp(Date.now());
    }, []);

    React.useEffect(() => {
        if (!hasCountdownSection) return undefined;

        const timerId = window.setInterval(() => {
            setNowTimestamp(Date.now());
        }, SECOND_IN_MS);

        return () => {
            window.clearInterval(timerId);
        };
    }, [hasCountdownSection]);

    const countdownInfo = React.useMemo(() => {
        if (nowTimestamp === null || !hasCountdownSection) {
            return {
                isActive: false,
                values: [],
            };
        }

        let targetTimestamp = null;
        if (nowTimestamp < countdownStartTimestamp) {
            targetTimestamp = countdownStartTimestamp;
        } else if (countdownEndTimestamp && nowTimestamp < countdownEndTimestamp) {
            targetTimestamp = countdownEndTimestamp;
        }

        if (!targetTimestamp) {
            return {
                isActive: false,
                values: [],
            };
        }

        const timeLeft = Math.max(targetTimestamp - nowTimestamp, 0);
        const days = Math.floor(timeLeft / DAY_IN_MS);
        const hours = Math.floor((timeLeft % DAY_IN_MS) / HOUR_IN_MS);
        const minutes = Math.floor((timeLeft % HOUR_IN_MS) / MINUTE_IN_MS);
        const seconds = Math.floor((timeLeft % MINUTE_IN_MS) / SECOND_IN_MS);

        return {
            isActive: true,
            values: [
                { label: "Days", value: String(days) },
                { label: "Hours", value: twoDigits(hours) },
                { label: "Minutes", value: twoDigits(minutes) },
                { label: "Seconds", value: twoDigits(seconds) },
            ],
        };
    }, [nowTimestamp, hasCountdownSection, countdownStartTimestamp, countdownEndTimestamp]);

    const timeRangeLabel = React.useMemo(() => {
        const formattedStartTime = formatExpoTime(startTimeValue);
        const formattedEndTime = formatExpoTime(endTimeValue);

        if (formattedStartTime && formattedEndTime) {
            return `${formattedStartTime} - ${formattedEndTime}`;
        }

        if (formattedStartTime) return formattedStartTime;
        if (formattedEndTime) return formattedEndTime;

        return "10:00 AM - 05:00 PM";
    }, [startTimeValue, endTimeValue]);

    const googleMapsUrl = React.useMemo(() => {
        const directMapUrl =
            expro?.google_map_url ||
            expro?.google_maps_url ||
            expro?.map_url ||
            expro?.location_url;

        if (directMapUrl) return directMapUrl;

        const latitude =
            expro?.latitude ??
            expro?.lat ??
            expro?.locationData?.latitude ??
            expro?.locationData?.lat;
        const longitude =
            expro?.longitude ??
            expro?.lng ??
            expro?.lon ??
            expro?.locationData?.longitude ??
            expro?.locationData?.lng ??
            expro?.locationData?.lon;

        const hasLatitude = latitude !== undefined && latitude !== null && String(latitude).trim() !== "";
        const hasLongitude = longitude !== undefined && longitude !== null && String(longitude).trim() !== "";

        if (hasLatitude && hasLongitude) {
            // `search` with lat/lng opens a dropped marker in Google Maps.
            return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${latitude},${longitude}`)}`;
        }

        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationLabel)}`;
    }, [expro, locationLabel]);

    React.useEffect(() => {
        if (!countdownInfo.isActive) {
            setShowStickyCountdown(false);
            return undefined;
        }

        const updateStickyVisibility = () => {
            const sectionElement = sectionRef.current;
            if (!sectionElement || window.innerWidth < 1024) {
                setShowStickyCountdown(false);
                return;
            }

            const headerHeight = window.scrollY > 100 ? 88 : 0;
            const sectionRect = sectionElement.getBoundingClientRect();
            const shouldShow = sectionRect.bottom <= headerHeight + 8;

            setShowStickyCountdown((prevState) =>
                prevState === shouldShow ? prevState : shouldShow
            );
        };

        updateStickyVisibility();
        window.addEventListener("scroll", updateStickyVisibility, { passive: true });
        window.addEventListener("resize", updateStickyVisibility);

        return () => {
            window.removeEventListener("scroll", updateStickyVisibility);
            window.removeEventListener("resize", updateStickyVisibility);
        };
    }, [countdownInfo.isActive]);
    return (
        <>
            {countdownInfo.isActive ? (
                <div
                    className={`hidden lg:block fixed left-0 right-0 top-[88px] z-[60] transform-gpu transition-all duration-300 ease-out ${showStickyCountdown
                            ? "translate-y-0 opacity-100 pointer-events-auto"
                            : "-translate-y-2 opacity-0 pointer-events-none"
                        }`}
                >
                    <div className=" border border-[#EAECF0] bg-white px-8 xl:px-12 py-3 shadow-sm ">
                        <div className="container flex items-center justify-between gap-6">
                            <h2 className="text-[16px] xl:text-[18px] font-bold text-[#1D2939] leading-tight line-clamp-2 flex-1 min-w-0">
                                {expro?.title || "Expo"}
                            </h2>

                            <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="flex gap-2.5">
                                    {countdownInfo.values.map((item, idx) => (
                                        <div
                                            key={`sticky-countdown-${idx}`}
                                            className="flex flex-col items-center bg-[#FFFAEB] border border-[#FEF0C7] p-1 rounded-lg"
                                        >
                                            <div className="w-10 md:w-14 flex items-center justify-center text-[#B54708] font-normal text-md">
                                                {item.value}
                                            </div>
                                            <span className="text-[10px] font-normal text-[#667085] uppercase tracking-wider">
                                                {["Day", "Hr", "Min", "Sec"][idx] || item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {!shouldHideRegisterAction ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsRegistrationModalOpen(true)}
                                        className="px-10 h-12 bg-[#ED8A19] text-white font-bold rounded-xl hover:bg-[#da7f18] transition-colors shadow-sm"
                                    >
                                        Register Now
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <div ref={sectionRef} className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-sm">
                <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-6 md:gap-8">
                    {/* Left Side: Banner Image */}
                    <div className="w-full lg:w-[565px] flex-shrink-0">
                        <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
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
                                Event By <br className="md:hidden" />{" "}
                                {companySlug ? (
                                    <Link
                                        href={`/company/${companySlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#1570EF] font-[14px] md:font-medium cursor-pointer hover:underline"
                                    >
                                        {organizerName}
                                    </Link>
                                ) : (
                                    <span className="text-[#1570EF] font-[14px] md:font-medium">
                                        {organizerName}
                                    </span>
                                )}
                            </p>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1570EF] text-white text-xs font-medium">
                                <Eye className="h-3.5 w-3.5" />
                                {expro?.view_count} Views
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
                                <span>{locationLabel}</span>
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${locationLabel} in Google Maps`}
                                    className="inline-flex"
                                >
                                    <ExternalLink className="h-3 w-3 text-[#2E90FA] cursor-pointer" />
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#475467] text-[14px] md:text-[15px]">
                                <Calendar className="h-4 w-4 text-[#667085] flex-shrink-0" />
                                <span>{expro.dateRange || "7 Feb, 2026 (Tuesday) - 9 Feb, 2026 (Thursday)"}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[#475467] text-[14px] md:text-[15px]">
                                <Clock className="h-4 w-4 text-[#667085] flex-shrink-0" />
                                <span>{timeRangeLabel}</span>
                            </div>
                        </div>

                        {/* Bottom Row: Countdown & Actions */}
                        <div
                            className={`mt-auto flex flex-col md:flex-row md:items-center gap-6 pt-2 ${countdownInfo.isActive ? "justify-between" : "md:justify-end"}`}
                        >
                            {/* Countdown */}
                            {countdownInfo?.isActive ? (
                                <div className="flex gap-2.5">
                                    {countdownInfo.values.map((item, idx) => (
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
                            ) : null}

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <ShareModal />
                                <BookmarkCompany expro slug={expro?.slug} is_favorite={expro?.is_favorited} />
                                {!shouldHideRegisterAction ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsRegistrationModalOpen(true)}
                                        className="flex-1 md:flex-none px-10 h-12 bg-[#ED8A19] text-white font-bold rounded-xl hover:bg-[#da7f18] transition-colors shadow-sm"
                                    >
                                        Register Now
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <ExpoRegistrationModal
                    open={isRegistrationModalOpen}
                    onOpenChange={setIsRegistrationModalOpen}
                    expoSlug={expro?.slug}
                    visitorRegUrl={visitorRegUrl}
                    modalId="expro_details_top"
                />
            </div>
        </>
    );
};

export default ExproDetailsTopSection;
