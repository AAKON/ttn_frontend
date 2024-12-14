import {apiRequest} from "@/utils/api";

export async function getBlogs(key, keyword, page=1) {

    let endpoint;

    if (!key && !keyword) {
        endpoint = `blog`;
    } else if (!keyword) {
        endpoint = `blog?blog_type_id=${key}&page=${page}`;
    } else if (!key) {
        endpoint = `blog?title=${encodeURIComponent(keyword)}&page=${page}`;
    } else {
        endpoint = `blog?title=${encodeURIComponent(keyword)}&blog_type_id=${key}&page=${page}`;
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