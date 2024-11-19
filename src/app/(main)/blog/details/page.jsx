"use client";
import {useParams} from "next/navigation";
import BlogDetails from "@/components/blog/blog-details";
import {blogData} from "@/components/blog/blog";

/**
 * Page component that renders the details of a specific blog post.
 * Retrieves the blog post ID from the URL parameters and fetches
 * the corresponding blog data. If the blog is not found, displays
 * an error message.
 */
function Page() {
    // Extract the 'details' parameter from the URL
    const {details} = useParams();

    // Find the blog post with the corresponding ID
    const blog = blogData.find((item) => item.id === parseInt(details));

    // Check if the blog exists, if not display 'Blog not found'
    if (!blog) {
        return <div className="flex justify-center items-center h-[20vh]">
            <p className="text-brand-700 font-semibold text-2xl text-center">Blog not found</p>
        </div>;
    }

    // Render the BlogDetails component with the found blog data
    return <BlogDetails blog={blog}/>
}

export default Page;