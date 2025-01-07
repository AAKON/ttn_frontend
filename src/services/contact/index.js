import {apiRequest} from "@/utils/api";

export async function getTeams() {
    const result = await apiRequest('team', {
        method: 'GET',
    });
    return result.data;
}