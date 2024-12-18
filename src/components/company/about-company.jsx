// "use client";
// import { useState } from 'react';
import {ChevronDownIcon} from "@/icons";

const AboutCompany = ({aboutData}) => {

    // const [Show, setShow] = useState(false);

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">About Company</h2>
            <p className="text-base text-gray-800 font-normal mt-4">
                {/*<span className="max-sm:hidden sm:hidden lg:block">{aboutData}</span>*/}
                {/*<span className="lg:hidden">{Show ? aboutData : aboutData?.slice(0, 129) + "..."}</span>*/}
                {aboutData}
            </p>
            {/*<h3 className="text-sm text-brand-700 leading-sm font-semibold lg:mt-[18px] cursor-pointer flex items-end gap-2"*/}
            {/*    onClick={() => setShow(!Show)}>*/}
            {/*    Show more <ChevronDownIcon stroke="#C67618" />*/}
            {/*</h3>*/}
        </div>
    )
}

export default AboutCompany