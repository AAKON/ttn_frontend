"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import BlogCard from "@/components/blog/blog-card";
import { debounce } from "lodash";
import RecommendedTopics from "@/components/blog/recommended-topics";
import { Empty, Error, Section } from "@/shared";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Search from "@/components/blog/search";
import { getBlogs, getBlogTypes } from "@/services/blogs";
import SkeletonBlogTypes from "@/components/shared/skelton/SkeletonBlogTypes";
import SkeletonBlogData from "@/components/shared/skelton/SkeletonBlogData";
import SidebarBlogs from "@/app/(main)/blog/_components/sidebar-blogs";
import PaginationBlog from "@/components/blog/pagination";

// Slider tab menu
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function BlogTabs({ ttnsData }) {
  const [blogTypes, setBlogTypes] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoadingBlogTypes, setIsLoadingBlogTypes] = useState(true);
  const [isLoadingBlogData, setIsLoadingBlogData] = useState(true);
  const [isBlogTypesEmpty, setIsBlogTypesEmpty] = useState(false);
  const [isBlogDataEmpty, setIsBlogDataEmpty] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const splideRef = useRef(null);

    const handleTabClick = (index) => {
      if (splideRef.current) {
        const splide = splideRef.current.splide;
        splide.go(index); // Move to the selected tab
      }
    };

  useEffect(() => {
    async function fetchBlogTypes() {
      try {
        setIsLoadingBlogTypes(true);
        const data = await getBlogTypes();
        const allTab = { id: "all", name: "All" }; // Add "All" tab
        setBlogTypes({
          blog_topics: [allTab, ...data.blog_topics],
        });
        fetchBlogs("all");
        // if (data?.blog_topics.length > 0) {
        //     const firstTabKey = data.blog_topics[0].id;
        //     setActiveTab(firstTabKey); // Set the first tab as active initially
        //     fetchBlogs(firstTabKey); // Fetch blogs for the first tab
        // }
      } catch (err) {
        setError(err);
        setIsBlogTypesEmpty(true);
      } finally {
        setIsLoadingBlogTypes(false);
      }
    }

    fetchBlogTypes();
  }, []);

  const fetchBlogs = async (key, keyword = "", page = 1) => {
    try {
      setIsLoadingBlogData(true);
      const blogs = await getBlogs(key === "all" ? null : key, keyword, page);
      setBlogData(blogs?.data || []);
      setCurrentPage(blogs?.current_page || 1);
      setTotalPages(blogs?.last_page || 1);
      setIsBlogDataEmpty(!blogs?.data || blogs.data.length === 0);
    } catch (err) {
      setError(err);
      setIsBlogDataEmpty(true);
    } finally {
      setIsLoadingBlogData(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key); // Update active tab
    setSearchKeyword(""); // Reset search keyword
    setDebouncedKeyword(""); // Reset debounced keyword
    // fetchBlogs(key);
    fetchBlogs(key, "", 1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Debounce search keyword
  useEffect(() => {
    // if (searchKeyword !== "") {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
      if (activeTab) fetchBlogs(activeTab, searchKeyword, 1); // Fetch blogs with debounced keyword
    }, 1000);

    return () => clearTimeout(handler); // Cleanup on unmount or re-render
    // }
  }, [searchKeyword]); // Only depend on searchKeyword

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      fetchBlogs(activeTab, debouncedKeyword, page);
    }
    console.log(page);
  };

  if (error) {
    return <Error error={error} />;
  }

  console.log(blogData, "get blogData");

  return (
    <>
      <div className={"pt-6 md:pb-12"}>
        <div className="items-center flex justify-center">
          <Search handleSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="pt-0 pb-10 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_356px] gap-6 lg:gap-16 pb-12">
          <div className="flex flex-col gap-8 max-w-[980px]">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="pb-2"
            >
              <TabsList className="w-full h-auto p-0 rounded-none bg-transparent flex justify-start flex-wrap gap-1 border-b border-gray-200">
                {isLoadingBlogTypes ? (
                  <SkeletonBlogTypes />
                ) : error ? (
                  <Error
                    message={error.message || "Failed to load blog types."}
                  />
                ) : isBlogTypesEmpty ? (
                  <Empty message="No blog types found." />
                ) : (
                  <Splide
                    ref={splideRef}
                    options={{
                      type: "slide",
                      focus: "center",
                      perPage: 3, // Adjust the number of visible items
                      gap: "1rem", // Space between items
                      pagination: false, // Remove pagination
                      arrows: false, // Hide arrows
                      drag: "free", // Enable free dragging
                      autoWidth: true, // Enable auto width for items
                    }}
                    className="w-full max-w-[1024px]"
                  >
                    {blogTypes?.blog_topics.map((type) => (
                      <SplideSlide key={type.id}>
                        <TabsTrigger
                          className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer bg-transparent text-gray-500 data-[state=active]:text-brand-700 border-b-2 border-b-transparent rounded-none shadow-none data-[state=active]:border-b-primary"
                          value={type.id}
                          onClick={() => handleTabClick(type.id)}
                        >
                          {type.name}
                        </TabsTrigger>
                      </SplideSlide>
                    ))}
                  </Splide>
                )}
              </TabsList>
              {isLoadingBlogData ? (
                <SkeletonBlogData />
              ) : error ? (
                <Error message={error.message || "Failed to load blogs."} />
              ) : isBlogDataEmpty ? (
                <Empty message="No blogs available for this category." />
              ) : (
                blogTypes?.blog_topics.map((type) => (
                  <TabsContent key={type.id} value={type.id}>
                    <div className="pt-8 flex flex-col gap-8">
                      {blogData &&
                        Array.isArray(blogData) &&
                        blogData.length > 0 &&
                        blogData.map((item, index) => (
                          <BlogCard key={index} item={item} />
                        ))}
                    </div>
                  </TabsContent>
                ))
              )}
            </Tabs>
          </div>
          {/* Right Sidebar */}
          <SidebarBlogs ttnsData={ttnsData} recomended={blogTypes} />
        </div>
        <PaginationBlog
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default BlogTabs;
