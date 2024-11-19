import {apiFetch} from "@/utils/api";

export async function fetchSiteConfig() {
    const result = await apiFetch('site-settings', {
        method: 'GET',
    });
    return result.data;
}