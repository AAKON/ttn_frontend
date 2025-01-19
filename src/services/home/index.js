import {apiRequest} from "@/utils/api";

export async function getHomeDetails() {
    const endpoint = `homepage`;
    const options = {
        method: 'GET',
        next: { revalidate: 3600 },
        cache: "force-cache"
    };
    const result = await apiRequest(endpoint, options);
    return result?.data;
}


export async function getBusinessArea() {
    const endpoint = `business-categories`;
    const options = {
        method: 'GET',
        next: { revalidate: 3600 },
        cache: "force-cache"
    };
    const result = await apiRequest(endpoint, options);
    return result?.data;
}






