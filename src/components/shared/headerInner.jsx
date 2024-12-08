"use client";
import React from 'react';
import {Nav} from "@/components/shared/nav";
import {usePathname} from "next/navigation";

function HeaderInner({className, hasToken, userInfo}) {
    const  pathname = usePathname();

    return (
        <div className={`py-5 md:py-6 ${pathname === '/' ? 'bg-transparent fixed md:absolute top-0 left-0 right-0 z-[1000] w-full' : 'bg-white'} ${className}`} >
            <Nav hasToken={hasToken} userInfo={userInfo} />
        </div>
    );
}

export default HeaderInner;