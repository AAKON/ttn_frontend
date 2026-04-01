import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Blocks, LogOutIcon, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/icons";

function AuthNavDropdown({ userInfo }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleSignout = async () => {
    try {
      const res = await signOut({ callbackUrl: "/", redirect: false });
      // Clear session cookies explicitly
      document.cookie = "next-auth.session-token=; Max-Age=0; path=/;";
      document.cookie = "next-auth.csrf-token=; Max-Age=0; path=/;";
      showSuccessToast(toast, "Sign Out successful!");

      let nextPath = "/";
      if (typeof res?.url === "string") {
        try {
          const parsedUrl = new URL(res.url);
          nextPath = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
        } catch (e) {
          nextPath = res.url.startsWith("/") ? res.url : "/";
        }
      }
      window.location.href = nextPath || "/";
    } catch (error) {
      console.error("Sign-out error:", error);
      showErrorToast(toast, "Sign Out failed!");
    }
  };

  return (
    <>
      <DropdownMenu className="left-auto right-0 z-[10000]" modal={false}>
        <DropdownMenuTrigger
          className="size-[36px] lg:size-12 rounded-full bg-gray-100 border border-gray-200 flex item-center justify-center p-0 focus:outline-none focus:ring-0"
          asChild
        >
          <Image
            src={
              userInfo?.profile_image ? userInfo?.profile_image : <UserIcon />
            }
            width={48}
            height={48}
            alt="profile"
            className="rounded-full size-[34px] lg:size-12 cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="right-0 z-[10000]">
          <DropdownMenuLabel className="pb-0.5">
            {userInfo?.user_name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal text-xs pt-0 text-gray-500">
            {userInfo?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            className="p-0 flex items-center w-full px-2 leading-8 gap-1 text-gray-500 cursor-pointer"
            onClick={() => handleNavigate("/myaccount/profile")}
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            className="flex items-center gap-1 text-gray-700 cursor-pointer"
            onClick={handleSignout}
          >
            <LogOutIcon />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default AuthNavDropdown;
