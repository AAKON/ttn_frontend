
const CountItem = ({ title, role }) => {
    return (
        <div className="pl-4 border-l-2 border-l-gray-200 w-[220px]">
            <h4 className="font-medium text-[45px] text-brand-600 pb-2">
                {title ? title : "12+"}
            </h4>
            <p className="text-gray-500 text-base font-medium capitalize">
                {role ? role : "Partners"}
            </p>
        </div>
    );
};

export default CountItem;
