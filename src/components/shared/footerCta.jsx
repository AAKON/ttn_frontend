"use client";
import React from "react";
import { usePathname } from "next/navigation";
import FooterCtaContent from "@/components/shared/footerCtaContent";

function FooterCta() {
    const pathname = usePathname();
    if (pathname === "/myaccount/company/add" || pathname === "/myaccount/profile") {
        return <></>;
    }
    return <FooterCtaContent />;
}

export default FooterCta;
