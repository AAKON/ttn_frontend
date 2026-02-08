"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import {
  CopyIcon,
  FacebookFIcon,
  ShareBoldIcon,
  TwitterIcon,
  WhatsAppIcon,
  RedditIcon,
} from "@/icons";
import { EnvelopeIcon } from "@/components/icons/envelope";
import Button from "@/components/shared/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ShareModal = () => {
  const pathname = usePathname(); // ✅ Get current route
  const [fullUrl, setFullUrl] = useState("");

  // ✅ Construct full URL dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const [copySuccess, setCopySuccess] = useState(false);

  // ✅ Copy URL function
  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button secondary className="!p-3 lg:!size-[48px] text-gray-400">
          <ShareBoldIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[464px] p-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Share
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Social Share Buttons */}
          <ul className="flex items-center gap-4">
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                className="size-[56px] rounded-full bg-[#65D072] flex items-center justify-center text-white"
              >
                <WhatsAppIcon stroke="#ffffff" width={30} height={30} />
              </a>
              <span className="text-xs text-gray-500">WhatsApp</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                className="size-[56px] rounded-full bg-[#425893] flex items-center justify-center text-white"
              >
                <FacebookFIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Facebook</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                className="size-[56px] rounded-full bg-[#1DA1F2] flex items-center justify-center text-white"
              >
                <TwitterIcon stroke="#ffffff" width={30} height={24} />
              </a>
              <span className="text-xs text-gray-500">Twitter</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href={`mailto:?subject=Check this out&body=${encodeURIComponent(fullUrl)}`}
                className="size-[56px] rounded-full bg-[#888888] flex items-center justify-center text-white"
              >
                <EnvelopeIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Email</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href={`https://www.reddit.com/submit?url=${encodeURIComponent(fullUrl)}`}
                target="_blank"
                className="size-[56px] rounded-full bg-[#FF4500] flex items-center justify-center text-white"
              >
                <RedditIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Reddit</span>
            </li>
          </ul>

          {/* Copy Link Input */}
          <div className="relative border border-gray-200 rounded-[8px] grid grid-cols-[1fr_auto] gap-2 h-12">
            <Input
              value={fullUrl}
              readOnly
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <span
              onClick={handleCopy}
              className="cursor-pointer p-[14px] inline-block"
            >
              <CopyIcon />
            </span>
          </div>
          {copySuccess && (
            <p className="text-green-500 text-sm text-center">Link copied!</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
