import { apiRequest } from "@/utils/api";

export async function getSourcingDetails(id, token) {
    const endpoint = `sourcing-proposals/${id}`;
    const options = {
        method: 'GET',
    };
    return await apiRequest(endpoint, options, null, token);
}