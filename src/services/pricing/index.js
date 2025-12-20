import { apiRequest } from "@/utils/api";

export async function getPricingList(type) {
    const endpoint = `pricing/list?type=${type}`;
    const options = {
        method: 'GET',
    };
    return await apiRequest(endpoint, options);
}
