import React from "react";
import img from "@/assets/blog1.jpg";
import Image from "next/image";
import righttopiocn from "@/assets/right-top-icon.svg";
import avatar from "@/assets/avatar.png";
import DateFormatter from "@/utils/dateFormatter";

const ResourceCard = ({ item }) => {
  const { title, thumbnail, slug, blog_topics, short_description, author, publish_date  } = item;
  return (
    <div className="group max-w-[445px] cursor-pointer">
      {/* img */}
      <div className="w-full h-[240px] rounded-2xl overflow-hidden">
        <Image
          src={thumbnail ? thumbnail : img}
          alt="blog-image"
          className="w-full h-full object-cover"
          width={454}
          height={240}
        />
      </div>
      {/* content */}
      <div className="pt-5">
        <span className="font-semibold text-xs lg:text-sm capitalize pb-2 text-brand-700">
          {blog_topics && blog_topics.map((item) => (
              <span key={item?.id}>{item?.name} </span>
          ))}
        </span>
        <div className="flex items-center justify-between">
          <a href={`/blog/${slug}`} className="font-semibold text-xl lg:text-2xl  text-gray-900">
            {title}
          </a>
          <a href={`blog/${slug}`} >
            <Image
                src={righttopiocn}
                alt="icon"
                className="group-hover:-translate-y-1 xl:block lg:hidden  transition-transform"
            />
          </a>
        </div>
        <p className="font-normal text-gray-700 text-sm lg:text-base pt-2 leading-6">
          {short_description.slice(0, 90) + "..."}
        </p>
        <div className="flex items-center pt-6 gap-3">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900">{author}</h4>
            <span className="font-normal text-sm text-gray-700">
              <DateFormatter publishDate={publish_date} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
