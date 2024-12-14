// utils/recentlyViewedBlogs.js
export const saveRecentlyViewedBlog = (blog) => {
    const maxBlogs = 10; // Set maximum number of recently viewed blogs
    const key = "recentlyViewedBlogs";

    // Get existing blogs from localStorage
    let blogs = JSON.parse(localStorage.getItem(key)) || [];

    // Check if blog is already in the list
    const blogExists = blogs.some((b) => b.id === blog.id);

    if (!blogExists) {
        // Add the new blog to the start of the list
        blogs.unshift(blog);
    }

    // Trim the list to the maximum allowed size
    if (blogs.length > maxBlogs) {
        blogs = blogs.slice(0, maxBlogs);
    }

    // Save updated list back to localStorage
    localStorage.setItem(key, JSON.stringify(blogs));
};
