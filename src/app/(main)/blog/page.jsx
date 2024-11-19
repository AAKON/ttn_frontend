
import Title from "@/components/blog/Title";
import Search from "@/components/blog/search";
import {Section} from "@/shared";
import BlogCard from "@/components/blog/blog-card";
import blog_1 from "@/assets/blog-1.jpg";
import {getBlogs} from "@/services/blogs/getBlogs";


const Blog = async () => {

    let blogData = [];

    try {
        blogData = await getBlogs();
    } catch (error) {
        console.error('Error fetching videos:', error);
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
                        <li
                            className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer rounded-[6px] bg-brand-50 text-brand-700"
                        >
                            View all
                        </li>
                        <li
                            className="capitalize py-2.5 px-3 font-semibold text-base cursor-pointer rounded-[6px] bg-transparent text-gray-500"
                        >
                            Technology
                        </li>
                    </ul>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:gap-6 lg:gap-8 lg:grid-cols-2">
                    {blogData?.data && Array.isArray(blogData?.data) && blogData?.data.length > 0 && blogData?.data.map((item, index) => (
                        <BlogCard
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            </Section>
        </>
    );
}

export default Blog;