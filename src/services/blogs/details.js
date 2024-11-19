import {apiRequest} from "@/utils/api";

export async function getBlogDetails(slug) {
    const endpoint = `blog/details/${slug}`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result?.data?.blog;
}