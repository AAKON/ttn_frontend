
const Count = ({ title, role }) => {
    return (
        <div className="pl-4 border-l-2 border-l-gray-200 w-[220px]">
            <h5 className="font-medium text-[20px] leading-normal md:text-[30px] text-brand-600 pb-2">
                {title ? title : "12+"}
            </h5>
            <p className="text-gray-500 text-xs md:text-base font-medium capitalize">
                {role ? role : "Partners"}
            </p>
        </div>
    );
};

export default Count;
