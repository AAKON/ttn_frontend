import Title from "@/components/blog/Title";
import Search from "@/components/blog/search";
import { Section } from "@/shared";
import BlogCard from "@/components/blog/blog-card";
import blog_1 from "@/assets/blog-1.jpg";
import {getBlogTTNS} from "@/services/blogs";
import RecommendedTopics from "@/components/blog/recommended-topics";
import PaginationBlog from "@/components/blog/pagination";
import BlogTabs from "@/app/(main)/blog/_components/blog-tabs";

const Blog = async () => {
  let ttnsData = [];

  try {
      ttnsData = await getBlogTTNS();
    console.log(ttnsData, "get blogdd");
  } catch (error) {
    console.error("Error fetching videos:", error);
      ttnsData = [];
  }

  return (
    <>
      <Section className={'pb-0 md:pb-0'}>
        <Title
          heading={"Resources and insights"}
          description={
            "The latest industry news, interviews, technologies, and resources."
          }
        />
      </Section>
      <BlogTabs ttnsData={ttnsData} />

    </>
  );
};

export default Blog;
