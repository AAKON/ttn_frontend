import {apiRequest} from "@/utils/api";

export async function getBlogs(key, title) {

    let endpoint;

    if (!key && !title) {
        endpoint = `blog`;
    } else if (!title) {
        endpoint = `blog?blog_type_id=${key}`;
    } else if (!key) {
        endpoint = `blog?title=${encodeURIComponent(title)}`;
    } else {
        endpoint = `blog?title=${encodeURIComponent(title)}&blog_type_id=${key}`;
    }

    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}

export async function getBlogTTNS() {
    const result = await apiRequest('blog/featured', {
        method: 'GET',
    });
    return result.data;
}

export async function getBlogTypes() {
    const result = await apiRequest('blog/types', {
        method: 'GET',
    });
    return result.data;
}

export async function getBlogDetails(slug) {
    const endpoint = `blog/details/${slug}`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result?.data?.blog;
}