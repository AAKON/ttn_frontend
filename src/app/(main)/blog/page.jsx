import Title from "@/components/blog/Title";
import { Section } from "@/shared";
import { getBlogTTNS } from "@/services/blogs";
import BlogTabs from "@/app/(main)/blog/_components/blog-tabs";

const Blog = async () => {
  let ttnsData = [];

  try {
    ttnsData = await getBlogTTNS();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    ttnsData = [];
  }

  return (
    <>
      <Section className={"pb-0 md:pb-0"}>
        <Title
          heading={"Stiching Stroies"}
          description={
            "The latest industry news, interviews, technologies, and resources."
          }
        />
        <BlogTabs ttnsData={ttnsData} />
      </Section>
    </>
  );
};

export default Blog;
