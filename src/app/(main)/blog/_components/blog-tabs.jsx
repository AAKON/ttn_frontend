'use client'
import React, {Suspense, useEffect, useState} from 'react';
import BlogCard from "@/components/blog/blog-card";
import { debounce } from "lodash";
import RecommendedTopics from "@/components/blog/recommended-topics";
import {Empty, Error, Section} from "@/shared";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import Search from "@/components/blog/search";
import {getBlogs, getBlogTypes} from "@/services/blogs";
import {log} from "next/dist/server/typescript/utils";
import SkeletonBlogTypes from "@/components/shared/skelton/SkeletonBlogTypes";
import SkeletonBlogData from "@/components/shared/skelton/SkeletonBlogData";
import SidebarBlogs from "@/app/(main)/blog/_components/sidebar-blogs";



function BlogTabs({ ttnsData }) {

    const [blogTypes, setBlogTypes] = useState(null);
    const [blogData, setBlogData] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [isLoadingBlogTypes, setIsLoadingBlogTypes] = useState(true);
    const [isLoadingBlogData, setIsLoadingBlogData] = useState(true);
    const [isBlogTypesEmpty, setIsBlogTypesEmpty] = useState(false);
    const [isBlogDataEmpty, setIsBlogDataEmpty] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    useEffect(() => {
        async function fetchBlogTypes() {
            try {
                setIsLoadingBlogTypes(true);
                const data = await getBlogTypes();
                console.log(data, "get blogTypes");
                setBlogTypes(data);
                if (data?.blog_topics.length > 0) {
                    const firstTabKey = data.blog_topics[0].id;
                    setActiveTab(firstTabKey); // Set the first tab as active initially
                    fetchBlogs(firstTabKey); // Fetch blogs for the first tab
                }
            } catch (err) {
                setError(err);
                setIsBlogTypesEmpty(true);
            }finally {
                setIsLoadingBlogTypes(false);
            }
        }

        fetchBlogTypes();
    }, []);

    const fetchBlogs = async (key, keyword = "") => {
        try {
            setIsLoadingBlogData(true);
            const blogs = await getBlogs(key, keyword);
            console.log(blogs, "get blogs");
            setBlogData(blogs);
            setIsBlogDataEmpty(!blogs?.data || blogs.data.length === 0);
        } catch (err) {
            setError(err);
            setIsBlogDataEmpty(true);
        }finally {
            setIsLoadingBlogData(false);
        }
    };

    const handleTabChange = (key) => {
        setActiveTab(key); // Update active tab
        setSearchKeyword(""); // Reset search keyword
        setDebouncedKeyword(""); // Reset debounced keyword
        fetchBlogs(key); // Fetch blogs for the selected tab
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
                if (activeTab) fetchBlogs(activeTab, searchKeyword); // Fetch blogs with debounced keyword
            }, 1000);

            return () => clearTimeout(handler); // Cleanup on unmount or re-render
        // }
    }, [searchKeyword]); // Only depend on searchKeyword

    if (error) {
        return <Error error={error} />;
    }


    return (
        <>
            <Section className={'pt-6 md:pb-12'}>
                <div className="items-center flex justify-center">
                    <Search handleSearchChange={handleSearchChange} />
                </div>
            </Section>
            <Section noDefaultStyle className="pt-0 pb-10 lg:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_356px] gap-6 lg:gap-16">
                    <div className="flex flex-col gap-8">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="pb-2">
                            <TabsList className="w-full h-auto p-0 rounded-none bg-transparent flex justify-start flex-wrap gap-1 border-b border-gray-200">
                                {isLoadingBlogTypes ? (
                                    <SkeletonBlogTypes />
                                ) : error ? (
                                    <Error message={error.message || "Failed to load blog types."} />
                                ) : isBlogTypesEmpty ? (
                                    <Empty message="No blog types found." />
                                ) : (
                                blogTypes?.blog_topics.map((type) => (
                                    <TabsTrigger
                                        key={type.id}
                                        className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer bg-transparent text-gray-500 data-[state=active]:text-brand-700 border-b-2 border-b-transparent rounded-none shadow-none data-[state=active]:border-b-primary"
                                        value={type.id}
                                    >
                                        {type.name}
                                    </TabsTrigger>
                                ))
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
                                        {blogData?.data &&
                                            Array.isArray(blogData?.data) &&
                                            blogData?.data.length > 0 &&
                                            blogData?.data.map((item, index) => (
                                                <BlogCard key={index} item={item}/>
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

                Pagination
                {/*<PaginationBlog />*/}
            </Section>
        </>
    );
}

export default BlogTabs;