import {apiRequest} from "@/utils/api";
export async function getBusinessArea() {
    const endpoint = `business-categories`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result?.data;
}


