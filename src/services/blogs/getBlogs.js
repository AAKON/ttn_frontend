import {apiRequest} from "@/utils/api";

export async function getBlogs() {
    const endpoint = 'blog';
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}