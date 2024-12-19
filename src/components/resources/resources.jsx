import { Section } from "@/shared";
import ResourceCard from "@/ui/resource-card";
import blog1 from "@/assets/blog1.jpg";
import avatar from "@/assets/avatar.png";
import Button from "@/components/shared/button";
import Link from "next/link";

const Resources = async ({ blogsPromise }) => {
  const homeBlogs = await blogsPromise;

  console.log(homeBlogs, "homeBlogs=====");

  return (
    <Section>
      <div>
        <h5 className="font-semibold hidden lg:block text-center capitalize tracking-tight text-[48px] pb-[64px] text-gray-900">
          Resources
        </h5>
        <p className="font-semibold text-center pb-8 lg:hidden text-2xl text-gray-900">
          Lastest blog posts
        </p>
        {/* all card */}
        {homeBlogs &&
          Array.isArray(homeBlogs?.TNN_picks) &&
          homeBlogs?.TNN_picks.length > 0 && (
            <div className="flex gap-x-4 flex-col md:flex-row gap-y-6 items-center justify-between">
              {homeBlogs?.TNN_picks.map((item) => (
                <ResourceCard key={item?.id} item={item} />
              ))}
            </div>
          )}
        <div className="flex items-center justify-center">
          <Button
            TagName={Link}
            href={"/blog"}
            className="xl:mt-[64px] mt-[32px]"
          >
            View all Resources
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Resources;
