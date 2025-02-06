"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/shared/button";
import { CopyIcon, Facebook, Twiter } from "@/icons";
import { usePathname } from "next/navigation";
import { Linkedin } from "@/components/icons/link";

function SocialShare() {
    const pathname = usePathname();
    const [copied, setCopied] = useState(false);
    const [pageUrl, setPageUrl] = useState(""); // Initialize empty to avoid SSR issues

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageUrl(`${window.location.origin}${pathname}`);
        }
    }, [pathname]); // Update URL when pathname changes

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const shareOnTwitter = () => {
        if (pageUrl) {
            const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`;
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const shareOnFacebook = () => {
        if (pageUrl) {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const shareOnLinkedIn = () => {
        if (pageUrl) {
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="flex gap-4">
            <Button secondary className="h-10" onClick={copyToClipboard} disabled={!pageUrl}>
                <CopyIcon />
                {copied ? "Copied!" : "Copy link"}
            </Button>
            <Button secondary className="!size-10 !p-1" onClick={shareOnTwitter} disabled={!pageUrl}>
                <Twiter />
            </Button>
            <Button secondary className="!size-10 !p-1" onClick={shareOnFacebook} disabled={!pageUrl}>
                <Facebook />
            </Button>
            <Button secondary className="!size-10 !p-1" onClick={shareOnLinkedIn} disabled={!pageUrl}>
                <Linkedin />
            </Button>
        </div>
    );
}

export default SocialShare;
