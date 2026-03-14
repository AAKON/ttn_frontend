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
        return resData?.data?.expo || resData?.data || resData;
    } catch (error) {
        console.error("Error fetching expo details:", error);
        return null;
    }
};

const getSimilarExpros = async (token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/expo?per_page=3`,
            {
                method: "GET",
                cache: "no-store",
                headers,
            }
        );
        const resData = await response.json();
        return resData?.data?.data || resData?.data || [];
    } catch (error) {
        console.error("Error fetching similar expros:", error);
        return [];
    }
};

const ExproDetailsPage = async ({ params }) => {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const [exproData, similarExprosData] = await Promise.all([
        getExproDetails(token, slug),
        getSimilarExpros(token),
    ]);

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
        organizer: exproData.company?.name || exproData.company_name || exproData.organizer,
        description: exproData.description || exproData.short_description,
    };

    const similarExpros = similarExprosData
        .filter(item => String(item.id) !== String(exproData.id) && String(item.slug) !== slug)
        .slice(0, 3)
        .map((item, index) => ({
            ...item,
            title: item.title || item.name,
            dateRange: formatDateRange(item.start_date || item.from_date, item.end_date || item.to_date),
            country: item.location?.name || item.location_name || item.country,
            organizer: item.company?.name || item.company_name || item.organizer,
            posterWord: item.poster_word || (item.title || item.name || "Expo").split(" ")[0]
        }));

    return (
        <div className="min-h-screen pb-16 pt-8 md:pt-10">
            <Container>
                {/* Top Section / Hero */}
                <ExproDetailsTopSection expro={expro} />

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-8 mt-10 items-start">
                    <ExproDetailsContent expro={expro} />
                    <ExproDetailsSidebar similarExpros={similarExpros} />
                </div>
            </Container>
        </div>
    );
};

export default ExproDetailsPage;
