
import { Section } from "@/shared";
import ResourceCard from "@/ui/resource-card";
import blog1 from "@/assets/blog1.jpg";
import avatar from "@/assets/avatar.png";
import Button from "@/components/ui/button";

const Resources = () => {
  const blogs = [
    {
      id: 1,
      image: blog1,
      source: "Tech Today",
      heading: "The Future of AI in Everyday Life",
      description:
        "Explore how AI is becoming an integral part of our daily routines and what the future holds for this transformative technology.",
      userImage: avatar,
      userName: "Alice Johnson",
      date: "2024-11-05",
    },
    {
      id: 2,
      image: blog1,
      source: "Health Hub",
      heading: "5 Tips for a Healthier Lifestyle",
      description:
        "Learn simple yet effective strategies to improve your physical and mental well-being in today’s fast-paced world.",
      userImage: avatar,
      userName: "Michael Lee",
      date: "2024-11-08",
    },
    {
      id: 3,
      image: blog1,
      source: "Travel Guide",
      heading: "Top Destinations to Visit in 2024",
      description:
        "A comprehensive list of the must-visit places around the world for your 2024 travel bucket list.",
      userImage: avatar,
      userName: "Sophia Martinez",
      date: "2024-10-30",
    },
  ];

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

        <div className="flex gap-x-4 flex-col md:flex-row gap-y-6 items-center justify-between">
          {blogs?.map((item, index) => (
            <ResourceCard key={index} item={item} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button className="xl:mt-[64px] mt-[32px]">
            View all Resources
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Resources;
