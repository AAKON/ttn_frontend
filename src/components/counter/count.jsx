"use client";
import CountUp from "react-countup";

const Count = ({ title, role, className, titleClass, roleClass, icon }) => {
    return (
        <div
            className={`xl:pl-4 pl-2 border-l-2 border-l-gray-200 w-[130px] xl:w-[220px] ${className}`}
        >
            <h5
                className={`font-medium text-xl xl:text-[30px] text-orange-500 pb-2 ${titleClass}`}
            >
                <CountUp start={0} end={title} />
                {icon}+
            </h5>
            <p
                className={`text-gray-500 text-xs xl:text-base font-medium capitalize ${roleClass}`}
            >
                {role ? role : "Partners"}
            </p>
        </div>
    );
};

export default Count;
