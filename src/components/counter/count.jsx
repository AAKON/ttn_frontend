"use client";
const Count = ({ value, role }) => {
  return (
    <>
      <div className="xl:pl-4 pl-2 border-l-2 border-l-gray-200 ">
        <h5 className="font-semibold text-xl xl:text-[30px] text-orange-500 pb-2">
          {value ? value : "12+"}
        </h5>
        <p
          className={`text-gray-500 text-xs xl:text-base font-medium capitalize `}
        >
          {role ? role : "Partners"}
        </p>
      </div>
    </>
  );
};

export default Count;
