import {
  CopyIcon,
  FacebookFIcon,
  ShareBoldIcon,
  TwitterIcon,
  WhatsAppIcon,
  RedditIcon,
} from "@/components/icons";
import { EnvelopeIcon } from "@/components/icons/envelope";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ShareModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button secondary className="p-3">
          <ShareBoldIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[464px] p-5 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Share
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ul className="flex items-center gap-4">
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href="#"
                className="size-[56px] rounded-full bg-[#65D072] flex items-center justify-center text-white"
              >
                <WhatsAppIcon stroke="#ffffff" width={30} height={30} />
              </a>
              <span className="text-xs text-gray-500">WhatsApp</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href="#"
                className="size-[56px] rounded-full bg-[#425893] flex items-center justify-center text-white"
              >
                <FacebookFIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Facebook</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href="#"
                className="size-[56px] rounded-full bg-[#425893] flex items-center justify-center text-white"
              >
                <TwitterIcon stroke="#ffffff" width={30} height={24} />
              </a>
              <span className="text-xs text-gray-500">Twitter</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href="#"
                className="size-[56px] rounded-full bg-[#888888] flex items-center justify-center text-white"
              >
                <EnvelopeIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Email</span>
            </li>
            <li className="px-2 flex flex-col gap-1 items-center">
              <a
                href="#"
                className="size-[56px] rounded-full bg-[#FF4500] flex items-center justify-center text-white"
              >
                <RedditIcon stroke="#ffffff" />
              </a>
              <span className="text-xs text-gray-500">Reddit</span>
            </li>
          </ul>
          <div className="relative border border-gray-200 rounded-[8px] grid grid-cols-[1fr_auto] gap-2 h-12">
            <Input
              placeholder="https://youtu.be/TGxKkBC6L2k"
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <span className="cursor-pointer p-[14px] inline-block">
              <CopyIcon />
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
