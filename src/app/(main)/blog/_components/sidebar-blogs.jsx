import React from 'react';
import RecommendedTopics from "@/components/blog/recommended-topics";
import Link from "next/link";

function SidebarBlogs({ ttnsData, recomended }) {

    console.log(ttnsData, 'ggt { ttnsData }' )

    return (
        <div className="max-w-[356px] w-[356px]">
            <div className="">
                {/* TNN Picks */}
                <h3 className="text-xl font-semibold text-gray-700">TNN Picks</h3>
                <div className="pt-6">
                    <div className="flex flex-col gap-y-8">
                        {ttnsData && ttnsData?.TNN_picks.map((item, index) => (
                                <Link key={index} href={`/blog/${item?.slug}`} className="block">
                                    <h4 className="text-sm font-medium text-gray-500 pb-2">
                                        {item?.title}
                                    </h4>
                                    <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2] line-clamp-3">
                                        {item?.short_description}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Recommended topics */}
                <h3 className="pt-12 pb-6 text-xl font-semibold text-gray-700">
                    Recommended topics
                </h3>
                {/* topics */}
                <div className="flex gap-4 items-center flex-wrap">
                    <RecommendedTopics recomended={recomended}/>
                </div>

                {/* Recently viewed */}
                <div className="sticky top-[120px]">
                    <h3 className="pt-12 pb-6 text-xl font-semibold text-gray-700">
                        Recently viewed
                    </h3>
                    <div className="flex flex-col gap-y-8">
                        <div>
                            <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
                                Bangladesh’s apparel industry is revolutionising the
                                fashion world by making a circular economy!
                            </p>
                            <span className="text-gray-500 font-semibold text-sm pt-2">
                            Textile Network • June 12, 2024{" "}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarBlogs;