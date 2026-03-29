import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Container } from "@/shared";
import ExproDetailsTopSection from "../components/expro-details-top-section";
import ExproDetailsContent from "../components/expro-details-content";
import ExproDetailsSidebar from "../components/expro-details-sidebar";

const formatDateRange = (startDate, endDate) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const parseDate = (value) => {
        if (!value) return null;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return formatter.format(date);
    };

    const formattedStart = parseDate(startDate);
    const formattedEnd = parseDate(endDate);

    if (formattedStart && formattedEnd) {
        return `${formattedStart} - ${formattedEnd}`;
    }
    return formattedStart || formattedEnd || "Date not available";
};

const getExpoImage = (item) => {
    return (
        item?.banner_url ||
        item?.cover_image ||
        item?.cover_image_url ||
        item?.banner_image ||
        item?.banner_image_url ||
        item?.image ||
        item?.image_url ||
        ""
    );
};

const getExpoCategoryId = (item) => {
    const directCandidates = [
        item?.category_id,
        item?.categoryId,
        item?.expo_category_id,
        item?.business_category_id,
        item?.category?.id,
        item?.expo_category?.id,
        item?.business_category?.id,
    ];

    for (const value of directCandidates) {
        const parsedValue = Number(value);
        if (Number.isFinite(parsedValue)) return parsedValue;
    }

    const collectionCandidates = [
        item?.categories,
        item?.category,
        item?.expo_categories,
        item?.business_categories,
    ];

    for (const collection of collectionCandidates) {
        if (!Array.isArray(collection)) continue;
        for (const value of collection) {
            const parsedValue =
                typeof value === "object" && value !== null
                    ? Number(value.id)
                    : Number(value);
            if (Number.isFinite(parsedValue)) return parsedValue;
        }
    }

    return null;
};

const getExproDetails = async (token, slug) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/expo/details/${slug}`,
            {
                method: "GET",
                cache: "no-store",
                headers,
            }
        );
        const resData = await response.json();
        const payload = resData?.data ?? resData;

        if (payload?.expo) {
            return {
                ...payload.expo,
                gallery_urls: payload.gallery_urls ?? payload.expo.gallery_urls ?? [],
                similar_expos: payload.similar_expos ?? payload.expo.similar_expos ?? [],
            };
        }

        return payload;
    } catch (error) {
        console.error("Error fetching expo details:", error);
        return null;
    }
};

const ExproDetailsPage = async ({ params }) => {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const exproData = await getExproDetails(token, slug);
    console.log({exproData});
    

    if (!exproData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Expo details not found.</p>
            </div>
        );
    }

    // Map API data to component requirements
    const expro = {
        ...exproData,
        title: exproData.title || exproData.name,
        dateRange: formatDateRange(exproData.start_date || exproData.from_date, exproData.end_date || exproData.to_date),
        location: exproData.location?.name || exproData.location_name || exproData.country,
        locationData: exproData.location,
        latitude:
            exproData.latitude ??
            exproData.lat ??
            exproData.location?.latitude ??
            exproData.location?.lat,
        longitude:
            exproData.longitude ??
            exproData.lng ??
            exproData.lon ??
            exproData.location?.longitude ??
            exproData.location?.lng ??
            exproData.location?.lon,
        organizer: exproData.company?.name || exproData.organizer_name || exproData.company_name || exproData.organizer,
        description: exproData.description || exproData.short_description,
        imageUrl: getExpoImage(exproData),
        galleryImages: Array.isArray(exproData.gallery_urls)
            ? exproData.gallery_urls
                .map((item, index) => {
                    const src = item?.original || item?.medium || item?.thumbnail;
                    if (!src) return null;
                    return {
                        id: item?.id || index,
                        src,
                        alt: `${exproData.title || exproData.name || "Expo"} gallery image ${index + 1}`,
                    };
                })
                .filter(Boolean)
            : [],
    };

    const similarExprosData = Array.isArray(exproData.similar_expos)
        ? exproData.similar_expos
        : [];

    const similarExpros = similarExprosData
        .filter(item => String(item.id) !== String(exproData.id) && String(item.slug) !== slug)
        .map((item) => ({
            ...item,
            title: item.title || item.name,
            dateRange: formatDateRange(item.start_date || item.from_date, item.end_date || item.to_date),
            country: item.location?.name || item.location_name || item.country,
            organizer: item.company?.name || item.organizer_name || item.company_name || item.organizer,
            posterWord: item.poster_word || (item.title || item.name || "Expo").split(" ")[0],
            imageUrl: getExpoImage(item),
        }));
    const exproCategoryId = getExpoCategoryId(exproData);

    return (
        <div className="min-h-screen pb-16 pt-8 md:pt-10">
            <Container>
                {/* Top Section / Hero */}
                <ExproDetailsTopSection expro={expro} />

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-8 mt-10 items-start">
                    <ExproDetailsContent expro={expro} />
                    <ExproDetailsSidebar
                        similarExpros={similarExpros}
                        categoryId={exproCategoryId}
                    />
                </div>
            </Container>
        </div>
    );
};

export default ExproDetailsPage;
