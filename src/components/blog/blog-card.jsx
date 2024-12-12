import Image from "next/image";
import blog_1 from "@/assets/blog-1.jpg";
import { Calender, UserEdit } from "@/icons";
import Link from "next/link";
import DateFormatter from "@/utils/dateFormatter";

const BlogCard = ({ item }) => {
  const {
    id,
    title,
    thumbnail,
    short_description,
    slug,
    featured,
    publish_date,
    blog_topics,
  } = item;
  return (
    <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5">
      {/* img */}
      <div className="w-full h-[240px] rounded-lg overflow-hidden">
        <Image
          src={thumbnail ? thumbnail : blog_1}
          alt="image"
          className="w-full h-full object-cover"
          width={445}
          height={240}
        />
      </div>
      {/* content */}
      <div>
        <span className="bg-brand-50 border border-brand-200 font-medium text-sm text-brand-700 py-1 px-[10px] rounded-2xl">
          Events
        </span>
        <h3 className="py-2 flex gap-3 justify-between">
          <Link
            href={`/blog/${slug}`}
            className="font-semibold cursor-pointer hover:underline min-[1300px]:text-2xl text-base lg:text-xl text-gray-900"
          >
            {title}
          </Link>
          <Link href={`/blog/${slug}`}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="#101828"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </h3>

        <p className="font-normal text-base text-gray-600 leading-6">
          {short_description.slice(0, 200) + "..."}
        </p>

        <div className="pt-4 lg:pt-6 flex items-center gap-x-6">
          {blog_topics?.name && (
            <div className="flex items-center gap-2">
              <UserEdit />
              <h2 className="text-sm font-semibold text-gray-600">
                {blog_topics?.name}
              </h2>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calender />
            <h2 className="text-sm font-semibold text-gray-600">
              <DateFormatter publishDate={publish_date} />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
