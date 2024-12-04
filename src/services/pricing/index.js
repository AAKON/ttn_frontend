import {apiRequest} from "@/utils/api";

export async function getPricingList() {
    const endpoint = 'pricing/list?type=marketing';
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
