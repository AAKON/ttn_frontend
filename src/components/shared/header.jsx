"use client";
import { Nav } from "./nav";
import {usePathname} from "next/navigation";

export const Header = ({className}) => {
    const  pathname = usePathname();
    return (
        <header className={`py-5 md:py-6 ${pathname === '/' ? 'bg-transparent fixed md:absolute top-0 left-0 right-0 z-[1000] w-full' : 'bg-white'} ${className}`} >
            <Nav />
        </header>
    );
};