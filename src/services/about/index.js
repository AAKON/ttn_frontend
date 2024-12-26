import {apiRequest} from "@/utils/api";

export async function getAboutData() {
    const endpoint = `about`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options);
    return result.data;
}
