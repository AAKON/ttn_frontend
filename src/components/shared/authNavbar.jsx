'use client'
import {
    User, Blocks, LogOutIcon
} from "lucide-react"
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

function AuthNavbar({userInfo}) {

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
                <DropdownMenuLabel className="pb-0.5">{userInfo?.user_name}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs pt-0">jhon@gmail.com</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem>
                    <Link className="flex items-center gap-1" href="/myaccount/profile">
                        <User />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex items-center gap-1" href="/myaccount/company">
                        <Blocks />
                        <span>My Companies</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200"/>
                <DropdownMenuItem className="flex items-center gap-1" onClick={() => setLogin(false)} className="cursor-pointer">
                    <LogOutIcon/>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AuthNavbar;