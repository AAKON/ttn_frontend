import Title from "@/components/blog/Title";
import Search from "@/components/blog/search";
import { Section } from "@/shared";
import BlogCard from "@/components/blog/blog-card";
import blog_1 from "@/assets/blog-1.jpg";
import { getBlogs } from "@/services/blogs/getBlogs";
import RecommendedTopics from "@/components/blog/recommended-topics";
import PaginationBlog from "@/components/blog/pagination";

const Blog = async () => {
  let blogData = [];

  try {
    blogData = await getBlogs();
    console.log(blogData, "get blogdd");
  } catch (error) {
    console.error("Error fetching videos:", error);
    blogData = [];
  }

  return (
    <>
      <Section>
        <Title
          heading={"Resources and insights"}
          description={
            "The latest industry news, interviews, technologies, and resources."
          }
        />
        <div className="items-center flex justify-center pt-12">
          <Search />
        </div>
      </Section>

      <Section noDefaultStyle className="pt-0 pb-10 lg:pb-20">
        <div className="pb-2">
          <ul className="flex items-center flex-wrap gap-1">
            <li className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer rounded-[6px] bg-brand-50 text-brand-700">
              View all
            </li>
            <li className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer rounded-[6px] bg-transparent text-gray-500">
              Technology
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_356px] gap-6 lg:gap-16">
          <div className="mt-8 flex flex-col gap-8">
            {blogData?.data &&
              Array.isArray(blogData?.data) &&
              blogData?.data.length > 0 &&
              blogData?.data.map((item, index) => (
                <BlogCard key={index} item={item} />
              ))}
          </div>
          {/* Right Sidebar */}
          <div className="max-w-[356px] w-[356px]">
            <div className="">
              {/* TNN Picks */}
              <h3 className="text-xl font-semibold text-gray-700">TNN Picks</h3>

              <div className="pt-6">
                <h4 className="text-sm font-medium text-gray-500 pb-2">
                  Textile Network
                </h4>
                <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
              </div>
              <div className="pt-8">
                <h4 className="text-sm font-medium text-gray-500 pb-2">
                  Textile Network
                </h4>
                <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
                  Bangladesh’s apparel industry is revolutionising the fashion
                  world by making a circular economy!
                </p>
              </div>
              <div className="pt-8">
                <h4 className="text-sm font-medium text-gray-500 pb-2">
                  Textile Network
                </h4>
                <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
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
                <RecommendedTopics />
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
                  <div>
                    <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
                      Bangladesh’s apparel industry is revolutionising the
                      fashion world by making a circular economy!
                    </p>
                    <span className="text-gray-500 font-semibold text-sm pt-2">
                      Textile Network • June 12, 2024{" "}
                    </span>
                  </div>
                  <div>
                    <p className="text-md lg:text-lg font-semibold text-gray-900 leading-[1.2]">
                      Bangladesh’s apparel industry is revolutionising the
                      fashion world by making a circular economy!
                    </p>
                    <span className="text-gray-500 font-semibold text-sm pt-2">
                      Textile Network • June 12, 2024{" "}
                    </span>
                  </div>
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
        </div>

        {/* Pagination */}
        {/* <PaginationBlog /> */}
      </Section>
    </>
  );
};

export default Blog;
