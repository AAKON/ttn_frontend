"use client";

import { Container } from "@/components/shared";
import Title from "./Title";
import Search from "./search";
import { useEffect, useState } from "react";
import BlogCard from "./blog-card";
import blog_1 from "@/assets/blog-1.jpg";

// tabs
const tabs = [
  "Business",
  "Startup",
  "Fashion & Retail",
  "Events",
  "Influencers",
];

// blogData
export const blogData = [
  {
    id: 1,
    image: blog_1,
    name: "The Future of Renewable Energy",
    description:
      "An in-depth look at the latest innovations in solar, wind, and geothermal energy.",
    category: "design",
    date: "2024-11-01",
  },
  {
    id: 2,
    image: blog_1,
    name: "10 Tips for Effective Time Management",
    description:
      "Master time management with these simple yet powerful tips for boosting productivity.",
    category: "product",
    date: "2024-10-15",
  },
  {
    id: 3,
    image: blog_1,
    name: "How to Start a Successful Startup",
    description:
      "A step-by-step guide to launching your own business and navigating the startup landscape.",
    category: "software development",
    date: "2024-09-20",
  },
  {
    id: 4,
    image: blog_1,
    name: "Exploring the Benefits of Meditation",
    description:
      "Discover how daily meditation can reduce stress, improve focus, and enhance well-being.",
    category: "product",
    date: "2024-08-30",
  },
  {
    id: 5,
    image: blog_1,
    name: "5 Easy DIY Home Improvement Projects",
    description:
      "Simple and cost-effective ways to upgrade your home with these DIY projects.",
    category: "customer success",
    date: "2024-07-25",
  },
  {
    id: 6,
    image: blog_1,
    name: "The Importance of Cybersecurity in 2024",
    description:
      "Why cybersecurity should be a top priority for businesses and individuals in the modern world.",
    category: "design",
    date: "2024-06-10",
  },
  {
    id: 7,
    image: blog_1,
    name: "How to Build a Minimalist Wardrobe",
    description:
      "A guide to curating a minimalist wardrobe that suits your style and needs.",
    category: "product",
    date: "2024-05-18",
  },
  {
    id: 8,
    image: blog_1,
    name: "Exploring the World of Plant-Based Diets",
    description:
      "The benefits of plant-based eating and how to transition to a vegetarian or vegan lifestyle.",
    category: "customer success",
    date: "2024-04-12",
  },
  {
    id: 9,
    image: blog_1,
    name: "How to Improve Your Writing Skills",
    description:
      "Practical tips and exercises to become a more confident and skilled writer.",
    category: "design",
    date: "2024-03-30",
  },
  {
    id: 10,
    image: blog_1,
    name: "Understanding the Basics of Artificial Intelligence",
    description:
      "A beginner's guide to AI, its applications, and its impact on various industries.",
    category: "product",
    date: "2024-02-22",
  },
];

const Blog = () => {
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const HandleSearch = (e) => {
    setSearch(e.target.value);
  };

  // search function
  let blogFilterData = blogData.filter((item) => {
    if (search !== "" && tab == "Business") {
      return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    } else {
      return item;
    }
  });

  // topics data
  const topicsData = [
    "Design",
    "Product",
    "Software Development",
    "Customer Success",
  ];

  const handleScroll = () => {
    if (window.scrollY > 1399) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-[80px]">
      <Container>
        <div className="py-[80px]">
          <Title
            heading={"Resources and insights"}
            description={
              "The latest industry news, interviews, technologies, and resources."
            }
          />
          <div className="items-center flex justify-center pt-12">
            {" "}
            <Search onChange={HandleSearch} />
          </div>
        </div>
        {/*  */}
        <div className="flex relative py-[80px] justify-between">
          {/* left */}
          <div className="w-[70%]">
            {/* tabs */}
            <div className="pb-2 border-b-2 border-b-gray-200">
              <ul className="flex items-center gap-x-4">
                <li
                  onClick={(e) => setTab("All")}
                  className={`font-semibold text-base text-gray-500 cursor-pointer relative after:absolute after:w-full after:h-[2px]  after:bg-brand-600 after:-bottom-2 after:left-0 ${
                    tab === item ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
                >
                  All
                </li>
                {tabs?.map((item, index) => (
                  <li
                    onClick={(e) => setTab(e.target.innerText)}
                    className={`font-semibold text-base text-gray-500 cursor-pointer relative after:absolute after:w-full after:h-[2px]  after:bg-brand-600 after:-bottom-2 after:left-0 ${
                      tab === item ? "after:scale-x-100" : "after:scale-x-0"
                    }`}
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* content */}

            {/* Business */}
            {tab.toLowerCase() == "business" && (
              <div className="pt-8 flex flex-col gap-y-8">
                {BusinessfilterData?.slice(0, 9).map((item, index) => (
                  <BlogCard key={index} item={item} />
                ))}
              </div>
            )}
            {/* startup */}
            {tab.toLowerCase() == "startup" && (
              <div className="pt-8 flex flex-col gap-y-8">
                {BusinessfilterData?.map((item, index) => (
                  <BlogCard key={index} item={item} />
                ))}
              </div>
            )}
            {/* Fashion & Retail */}
            {tab.toLowerCase() == "fashion & retail" && (
              <div className="pt-8 flex flex-col gap-y-8">
                {BusinessfilterData?.map((item, index) => (
                  <BlogCard key={index} item={item} />
                ))}
              </div>
            )}
            {/* Events */}
            {tab.toLowerCase() == "events" && (
              <div className="pt-8 flex flex-col gap-y-8">
                {BusinessfilterData?.map((item, index) => (
                  <BlogCard key={index} item={item} />
                ))}
              </div>
            )}
            {/* Influencers */}
            {tab.toLowerCase() == "influencers" && (
              <div className="pt-8 flex flex-col gap-y-8">
                {BusinessfilterData?.map((item, index) => (
                  <BlogCard key={index} item={item} />
                ))}
              </div>
            )}
          </div>
          {/* right */}
          <div
            className={`w-[25%] ${
              scrolled ? "fixed right-[12px] top-[-90%]" : "sticky"
            }`}
          >
            {/* TNN Picks */}
            <h3 className="text-xl font-semibold text-gray-700">TNN Picks</h3>

            <div className="pt-6">
              <h4 className="text-sm font-medium text-gray-500 pb-2">
                Textile Network
              </h4>
              <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                Bangladesh’s apparel industry is revolutionising the fashion
                world by making a circular economy!
              </p>
            </div>
            <div className="pt-8">
              <h4 className="text-sm font-medium text-gray-500 pb-2">
                Textile Network
              </h4>
              <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                Bangladesh’s apparel industry is revolutionising the fashion
                world by making a circular economy!
              </p>
            </div>
            <div className="pt-8">
              <h4 className="text-sm font-medium text-gray-500 pb-2">
                Textile Network
              </h4>
              <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                Bangladesh’s apparel industry is revolutionising the fashion
                world by making a circular economy!
              </p>
            </div>
            {/* Recommended topics */}
            <h3 className="pt-12 pb-6 text-xl font-semibold text-gray-700">
              Recommended topics
            </h3>
            {/* topics */}
            <div className="flex gap-4 items-center flex-wrap">
              {topicsData?.map((item, index) => (
                <div
                  key={index}
                  className="text-gray-700 leading-[16px] text-base font-normal py-3 px-4 rounded-[48px] bg-gray-50"
                >
                  {item}
                </div>
              ))}
            </div>
            {/* Recently viewed */}
            <h3 className="pt-12 pb-6 text-xl font-semibold text-gray-700">
              Recently viewed
            </h3>
            <div className="flex flex-col gap-y-8">
              <div>
                <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
                <span className="text-gray-500 font-semibold text-sm pt-2">
                  Textile Network • June 12, 2024{" "}
                </span>
              </div>
              <div>
                <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
                <span className="text-gray-500 font-semibold text-sm pt-2">
                  Textile Network • June 12, 2024{" "}
                </span>
              </div>
              <div>
                <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
                <span className="text-gray-500 font-semibold text-sm pt-2">
                  Textile Network • June 12, 2024{" "}
                </span>
              </div>
              <div>
                <p className="text-lg w-[312px] font-semibold text-gray-900 leading-7">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
                <span className="text-gray-500 font-semibold text-sm pt-2">
                  Textile Network • June 12, 2024{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
