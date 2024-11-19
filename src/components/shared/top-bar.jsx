
"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {Cross} from "@/icons";
export function TopBar(props) {
    const [show, setShow] = useState(true);
    const pathname = usePathname();
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            {show && (
                <div
                    className={`py-3 bg-gradient-to-l from-[#F7931E] to-[#DF861E] relative ${pathname.includes("blog") ? 'hidden md:block' : 'hidden'}`}>
                    <div className="container">
                        <div className="flex justify-center items-center">
                            <p className="text-white">{props.title}</p>
                        </div>
                    </div>
                    <span onClick={handleClose}
                          className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer p-2">
                        <Cross strokeColor="#fff" height={16} width={16}/>
                    </span>
                </div>
            )}
        </>
    );
}
