import Link from "next/link";
import {Arrowback} from "@/icons";
import React from "react";

export const BackLink = ({title, link="/login"}) => {
    return (
        <div className="flex items-center justify-center">
            <Link
                className="text-gray-600 text-sm font-semibold flex items-center gap-1.5"
                href={link}>
                <Arrowback/>
                <span>{title}</span>
            </Link>
        </div>
    )
}