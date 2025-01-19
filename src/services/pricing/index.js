import {apiRequest} from "@/utils/api";

export async function getPricingList(tabType) {
    const endpoint = `pricing/list?type=${tabType}`;
    const options = {
        method: 'GET',
        next: { revalidate: 3600 }
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
