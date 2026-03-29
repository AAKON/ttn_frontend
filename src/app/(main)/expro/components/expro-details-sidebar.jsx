"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import ExpoRegistrationModal from "./expo-registration-modal";

const SimilarExproCard = ({ expro, onRegisterClick }) => {
    const visitorRegUrl =
        expro?.visitor_reg_url ||
        expro?.visitor_registration_url ||
        expro?.visitorRegUrl ||
        expro?.registration_url ||
        "";
    const imageUrl =
        expro?.imageUrl ||
        expro?.banner_url ||
        expro?.image ||
        expro?.image_url ||
        "";
    const hasImage = Boolean(imageUrl);

    return (
        <div className="group border border-[#EAECF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
            <div className="relative aspect-[16/9] bg-gray-100">
                {hasImage ? (
                    <Image
                        src={imageUrl}
                        alt={expro?.title || "Expo image"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 340px"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">{expro.posterWord || "Expro"}</span>
                    </div>
                )}
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
                    <button
                        type="button"
                        onClick={() => onRegisterClick?.(expro?.slug, visitorRegUrl)}
                        className="w-full bg-white py-2 text-xs font-semibold text-[#344054] border border-[#D0D5DD] rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Register Now
                    </button>
                    <Link
                        href={expro?.slug ? `/expro/${expro.slug}` : "/expro"}
                        className="w-full bg-white py-2 text-xs font-semibold border border-[#ED8A19] text-[#ED8A19] rounded-lg hover:bg-[#FFFAEB] transition-colors text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ExproDetailsSidebar = ({ similarExpros = [] }) => {
    const { toast } = useToast();
    const [email, setEmail] = React.useState("");
    const [isSubscribing, setIsSubscribing] = React.useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false);
    const [selectedExpoSlug, setSelectedExpoSlug] = React.useState("");
    const [selectedVisitorRegUrl, setSelectedVisitorRegUrl] = React.useState("");

    const handleRegistrationModalOpenChange = (nextOpen) => {
        setIsRegistrationModalOpen(nextOpen);
        if (!nextOpen) {
            setSelectedExpoSlug("");
            setSelectedVisitorRegUrl("");
        }
    };

    const handleRegisterNow = (expoSlug, visitorRegUrl) => {
        setSelectedExpoSlug(String(expoSlug || ""));
        setSelectedVisitorRegUrl(String(visitorRegUrl || ""));
        setIsRegistrationModalOpen(true);
    };

    const handleReminderSubscribe = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            showErrorToast(toast, "Email is required.");
            return;
        }

        setIsSubscribing(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/expo/reminder/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: trimmedEmail }),
                }
            );

            const data = await response.json().catch(() => ({}));
            const isSuccess = response.ok && (data?.status === true || data?.code === 200);

            if (!isSuccess) {
                showErrorToast(toast, data?.message || "Failed to subscribe reminder.");
                return;
            }

            showSuccessToast(toast, data?.message || "Subscribed successfully!");
            setEmail("");
        } catch (error) {
            showErrorToast(toast, error?.message || "Failed to subscribe reminder.");
        } finally {
            setIsSubscribing(false);
        }
    };

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

                <form className="space-y-3" onSubmit={handleReminderSubscribe}>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubscribing}
                            className="flex-1 px-4 h-11 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1570EF] focus:ring-1 focus:ring-[#1570EF] transition-all text-sm"
                        />
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="px-5 h-11 bg-[#ED8A19] text-white font-semibold rounded-lg hover:bg-[#da7f18] transition-colors text-sm whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubscribing ? "Subscribing..." : "Subscribe"}
                        </button>
                    </div>
                    <p className="text-[12px] text-[#667085]">
                        We care about your data in our <Link href="/privacy-policy" className="underline hover:text-[#101828]">privacy policy</Link>.
                    </p>
                </form>
            </div>

            {/* Similar Expo Widget */}
            <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-sm">
                
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#101828]">Similar Expo</h3>
                    {similarExpros.length > 0 ? (
                        <Link href="/expro" className="text-sm font-semibold text-[#1570EF] hover:underline">
                            View All
                        </Link>
                    ) : null}
                </div>

                <div className="space-y-4">
                    {similarExpros.length > 0 ? (
                        similarExpros.map((expro, idx) => (
                            <SimilarExproCard
                                key={idx}
                                expro={expro}
                                onRegisterClick={handleRegisterNow}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-[#667085] italic">No similar events found.</p>
                    )}
                </div>
            </div>

            <ExpoRegistrationModal
                open={isRegistrationModalOpen}
                onOpenChange={handleRegistrationModalOpenChange}
                expoSlug={selectedExpoSlug}
                visitorRegUrl={selectedVisitorRegUrl}
                modalId="expro_details_sidebar"
            />
        </div>
    );
};

export default ExproDetailsSidebar;
