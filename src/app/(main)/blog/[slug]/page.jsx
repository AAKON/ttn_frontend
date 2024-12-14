import BlogDetails from "@/components/blog/blog-details";
import {getBlogDetails} from "@/services/blogs";

/**
 * Page component that renders the details of a specific blog post.
 * Retrieves the blog post ID from the URL parameters and fetches
 * the corresponding blog data. If the blog is not found, displays
 * an error message.
 */

export async function generateMetadata({ params }) {
    const slug = (await params).slug
    try {
        // Fetch blog details for metadata
        const details = await getBlogDetails(slug);

        if (!details) {
            return {
                title: "Blog Not Found",
                description: "The blog post you are looking for does not exist.",
            };
        }

        return {
            title: details?.meta_title, // Blog title
            description: details?.meta_description || "Read more on our blog!", // Meta description
            keywords: details?.meta_keywords,
            openGraph: {
                title: details.title,
                description: details?.meta_description || details.content.substring(0, 150), // A fallback if no excerpt
                images: [
                    {
                        url: process.env.NEXT_PUBLIC_BASE_URL + details?.featured_image, // OG image URL
                        width: 1200,
                        height: 630,
                        alt: details?.meta_title,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: "Error",
            description: "An error occurred while fetching the blog details.",
        };
    }
}
const BlogDetailsPage = async ({ params }) => {

    const slug = (await params).slug
    const blogPromise = await getBlogDetails(slug);
    const details = await blogPromise;

    // Find the blog post with the corresponding ID

    // Check if the blog exists, if not display 'Blog not found'
    if (!details) {
        return <div className="flex justify-center items-center h-[20vh]">
            <p className="text-brand-700 font-semibold text-2xl text-center">Blog not found</p>
        </div>;
    }

    // Render the BlogDetails component with the found blog data
    return <BlogDetails blog={details}/>
}

export default BlogDetailsPage;