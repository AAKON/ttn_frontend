import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import user_pic from "@/assets/user_pic.png";
import Link from "next/link";
import {LogOutIcon} from "lucide-react";

function AuthNavbar(props) {
    return (
        <DropdownMenu className="left-auto right-0">
            <DropdownMenuTrigger className="size-12 rounded-full bg-gray-100 border border-gray-200 flex item-center justify-center p-0 focus:outline-none focus:ring-0">
                <Image
                    src={user_pic}
                    width={48}
                    height={48}
                    alt="profile"
                    className="rounded-full"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="right-0">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/myaccount/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/myaccount/company">My Companies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLogin(false)} className="cursor-pointer">
                    Log out
                    <LogOutIcon />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AuthNavbar;