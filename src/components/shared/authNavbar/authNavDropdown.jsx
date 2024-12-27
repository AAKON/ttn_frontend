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
import {UserIcon} from "@/icons";

function AuthNavDropdown({ userInfo }) {
  const { toast } = useToast();

  const handleSignout = () => {
    try {
      signOut({ callbackUrl: "/", redirect:true });
      // Clear session cookies explicitly
      document.cookie = "next-auth.session-token=; Max-Age=0; path=/;";
      document.cookie = "next-auth.csrf-token=; Max-Age=0; path=/;";
      showSuccessToast(toast, "Sign Out successful!");
      // router.replace(router.asPath);
    } catch (error) {
      console.error("Sign-out error:", error);
      showErrorToast(toast, "Sign Out failed!");
    }
  };

  return (
    <>
      <DropdownMenu className="left-auto right-0">
        <DropdownMenuTrigger className="size-[36px] lg:size-12 rounded-full bg-gray-100 border border-gray-200 flex item-center justify-center p-0 focus:outline-none focus:ring-0">
          <Image
            src={userInfo?.profile_image ? userInfo?.profile_image : <UserIcon />}
            width={48}
            height={48}
            alt="profile"
            className="rounded-full size-[34px] lg:size-12"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="right-0">
          <DropdownMenuLabel className="pb-0.5">
            {userInfo?.user_name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal text-xs pt-0 text-gray-500">
            {userInfo?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-1 text-gray-500"
              href="/myaccount/profile"
            >
              <User />
              <span>Profile</span>
            </Link>
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
