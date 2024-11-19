import {apiFetch} from "@/utils/api";

export async function getLatestBlogs() {
    const result = await apiFetch('blogs/latest', {
        method: 'GET',
    });
    return result.data;
}

