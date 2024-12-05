import {apiRequest} from "@/utils/api";

export async function getPricingList(tabType) {
    const endpoint = `pricing/list?type=${tabType}`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
