import {apiRequest} from "@/utils/api";

export async function getPartnerList() {
    const endpoint = `partners`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
