"use client";
import { useState } from 'react';
import {ChevronDownIcon} from "@/icons";

const AboutCompany = () => {

    const abCompany = "Codeblue Clothing Private Limited is a Non-govt company, incorporated on 08 Jun, 2010. It serves as a prominent sourcing hub for leading e-commerce and retail players in India. The company has earned its position as a preferred partner for renowned e-commerce names that entrust Codeblue with responsibilities in product development, manufacturing, and design solutions, employing a holistic approach.";

    const [Show, setShow] = useState(false);

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">About Company</h2>
            <p className="text-base text-gray-800 font-normal mt-4">
                <span className="max-sm:hidden sm:hidden lg:block">{abCompany}</span>
                <span className="lg:hidden">{Show ? abCompany : abCompany.slice(0, 129) + "..."}</span>
            </p>
            <h3 className="text-sm text-brand-700 leading-sm font-semibold lg:mt-[18px] cursor-pointer flex items-end gap-2"
                onClick={() => setShow(!Show)}>
                Show more <ChevronDownIcon stroke="#C67618" />
            </h3>
        </div>
    )
}

export default AboutCompany