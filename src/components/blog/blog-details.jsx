import React from "react";
import Image from "next/image";
import detailsImg1 from "@/assets/detailsImg1.jpg";
import detailsImg2 from "@/assets/detailsImg2.jpg";
import detailsImg3 from "@/assets/detailsImg3.jpg";
import { CalendarIcon } from "lucide-react";
import { CopyIcon, Facebook, Link, Twiter, UserEdit } from "@/icons";
import Button from "@/components/shared/button";

const BlogDetails = async ({ blog }) => {
  return (
    <div className="pb-8 lg:pb-20">
      <div className="lg:w-[1024px] container w-container mx-auto">
        <h1 className="lg:w-[770px] lg:text-[48px]  w-container text-3xl leading-tight font-semibold text-gray-900 pt-[70px] mx-auto text-center">
          {blog.title}
        </h1>

        {/*<p className="lg:text-[20px] text-gray-600 lg:leading-[30px] lg:w-[800px] lg:block hidden mx-auto text-center mt-6">*/}
        {/*  How do you create compelling presentations that wow your colleagues.*/}
        {/*</p>*/}

        {/*<p className="text-[18px] text-gray-600 leading-[28px] w-full lg:hidden block mx-auto text-center mt-6">*/}
        {/*  How do you create compelling presentations that wow your colleagues*/}
        {/*  and impress your managers? Here’s how to get started.*/}
        {/*</p>*/}

        <div className="flex justify-center gap-4 mt-8">
          {blog?.author && (
            <div className="flex items-center gap-2 lg:text-base text-sm">
              <UserEdit color={"#182230"} />
              {blog?.author}
            </div>
          )}
          {blog?.updated_at && (
            <div className="flex items-center gap-2 lg:text-base text-sm">
              <CalendarIcon />
              <span>{blog?.updated_at}</span>
            </div>
          )}
        </div>

        <div className="mt-16 pb-8">
          <div className="lg:max-w-[1024px] lg:h-[560px] w-container mx-auto">
            <Image
              src={blog?.featured_image ? blog.featured_image : detailsImg1}
              width={0}
              height={0}
              sizes="100vw"
              alt="feature image"
              className="w-full h-full"
            />
          </div>
          <article
            className="paragraph lg:text-lg text-gray-600 lg:leading-[30px] lg:mt-20 mt-[32px]"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>

        <div className="flex lg:flex-row flex-col justify-between lg:gap-0 gap-6 border-t border-t-gray-200 pt-6 lg:pt-8">
          <div className="flex gap-2 items-center">
            {blog?.blog_types &&
              blog?.blog_types?.map((blogType) => (
                <Button
                  secondary
                  key={blogType?.id}
                  className="!h-6 !text-sm !font-medium !leading-5 rounded-full !py-[2px] !px-[10px] !text-brand-700 !bg-brand-50 !border-brand-200"
                >
                  {blogType?.name}
                </Button>
              ))}
          </div>

          <div className="flex gap-4">
            <Button secondary className="h-10">
              <CopyIcon />
              Copy link
            </Button>

            <Button secondary className="!size-10 !p-1">
              <Twiter />
            </Button>

            <Button secondary className="!size-10 !p-1">
              <Facebook />
            </Button>

            <Button secondary className="!size-10 !p-1">
              <Link />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
