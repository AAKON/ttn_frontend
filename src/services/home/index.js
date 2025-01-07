import {apiRequest} from "@/utils/api";

export async function getHomeDetails() {
    const endpoint = `homepage`;
    const options = {
        cache: 'no-store',
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result?.data;
}


export async function getBusinessArea() {
    const endpoint = `business-categories`;
    const options = {
        cache: 'no-store',
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result?.data;
}






