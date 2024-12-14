import React, {useEffect, useState} from 'react';
import Link from "next/link";
import DateFormatter from "@/utils/dateFormatter";

function RecentlyViewed(props) {

    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        // Load recently viewed blogs from localStorage
        const blogs = JSON.parse(localStorage.getItem("recentlyViewedBlogs")) || [];
        setRecentBlogs(blogs);
    }, []);


    return (
        <div className="sticky top-[120px]">
            <h3 className="pt-12 pb-6 text-xl font-semibold text-gray-700">
                Recently viewed
            </h3>
            {recentBlogs.length === 0 ? (
                <p>No recently viewed blogs.</p>
            ) : (
            <div className="flex flex-col gap-y-8">
                {recentBlogs.map((blog) => (
                <Link className="block" href={`/blog/${blog?.slug}`} key={blog?.id}>
                    <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2] line-clamp-3">
                        {blog?.short_description}
                    </p>
                    <span className="text-gray-500 font-semibold text-sm pt-2">
                            {blog?.blog_topics[0]?.name || 'Textile Network'} • <DateFormatter publishDate={blog?.publishDate} />{" "}
                            </span>
                </Link>
                ))}
            </div>
            )}
        </div>
    );
}

export default RecentlyViewed;