import {apiRequest} from "@/utils/api";

export async function getTeams() {
    const result = await apiRequest('team', {
        method: 'GET',
    });
    return result.data;
}

export async function getAbout() {
    const result = await apiRequest('about', {
        method: 'GET',
    });
    return result.data;
}
export async function getTerms() {
    const result = await apiRequest('terms-and-conditions', {
        method: 'GET',
    });
    return result.data;
}
