import React from "react";
import img from "@/assets/blog1.jpg";
import Image from "next/image";
import righttopiocn from "@/assets/right-top-icon.svg";
import avatar from "@/assets/avatar.png";

const ResourceCard = ({ item }) => {
  const { image, source, heading, description, userImage, userName, date } =
    item;
  return (
    <div className="group max-w-[445px] cursor-pointer">
      {/* img */}
      <div className="w-full h-[240px] rounded-2xl overflow-hidden">
        <Image
          src={image ? image : img}
          alt="blog-image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* content */}
      <div className="pt-5">
        <span className="font-semibold text-xs lg:text-sm capitalize pb-2 text-brand-700">
          {source}
        </span>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl lg:text-2xl  text-gray-900">
            {heading}
          </p>
          <Image
            src={righttopiocn}
            alt="icon"
            className="group-hover:-translate-y-1 xl:block lg:hidden  transition-transform"
          />
        </div>
        <p className="font-normal text-gray-700 text-sm lg:text-base pt-2 leading-6">
          {description.slice(0, 90) + "..."}
        </p>
        <div className="flex items-center pt-6 gap-x-3">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              src={userImage ? userImage : avatar}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900">{userName}</h4>
            <span className="font-normal text-sm text-gray-700">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
