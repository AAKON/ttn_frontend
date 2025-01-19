import {apiRequest} from "@/utils/api";

export async function getPartnerList() {
    const endpoint = `partners`;
    const options = {
        method: 'GET',
        next: { revalidate: 3600 }
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
