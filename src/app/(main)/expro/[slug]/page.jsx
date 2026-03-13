"use client";

import React, { use } from "react";
import { Container } from "@/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ExproDetailsTopSection from "../components/expro-details-top-section";
import ExproDetailsContent from "../components/expro-details-content";
import ExproDetailsSidebar from "../components/expro-details-sidebar";

// Mock data for initial development (matching ExproCard formats)
const exproListFake = [
    {
        id: 1,
        posterWord: "Index",
        posterTagline: "The world's leading nonwovens exhibition",
        posterDate: "19-22 May 2026",
        posterCta: "Register Today!",
        dateRange: "7 Feb, 2026 - 9 Feb, 2026",
        title: "INDEXTM26 - The World's Leading Nonwovens Exhibition",
        country: "Bangladesh",
        organizer: "Intex South Asia",
        variant: "emerald",
        location: "Guangzhou Exhibition Centre, Guangzhou, China",
        description: "<h3>What information do we collect?</h3><p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p><p>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p><h3>How do we use your information?</h3><p>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</p><p>Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.</p>",
    },
    {
        id: 2,
        posterWord: "Intex",
        posterTagline: "The premier international textile sourcing show of South Asia",
        posterDate: "25-27 June, 2025",
        posterCta: "",
        dateRange: "25 June, 2025 - 27 June, 2025",
        title: "Intex Bangladesh 2025",
        country: "Bangladesh",
        organizer: "Intex South Asia",
        variant: "crimson",
        location: "ICCB, Dhaka, Bangladesh",
        description: "Intex South Asia is the largest international textile sourcing show in South Asia, showcasing a wide range of products including yarns, fabrics, and accessories.",
    },
    {
        id: 3,
        posterWord: "Intertextile",
        posterTagline: "Shanghai apparel fabrics",
        posterDate: "7-9 Feb, 2026",
        posterCta: "",
        dateRange: "7 Feb, 2026 - 9 Feb, 2026",
        title: "Inter Textile Shanghai Apparel Fabrics Expo",
        country: "China",
        organizer: "Shanghai Apparel Fabrics Expo",
        variant: "plum",
        location: "NECC, Shanghai, China",
        description: "Intertextile Shanghai Apparel Fabrics is a comprehensive platform to showcase your apparel fabrics and accessories to a wide range of potential customers.",
    },
];

const ExproDetailsPage = ({ params }) => {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    // Find the expro by ID (slug for now)
    const expro = exproListFake.find(item => String(item.id) === slug) || exproListFake[0];
    const similarExpros = exproListFake.filter(item => String(item.id) !== slug).slice(0, 2);

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
