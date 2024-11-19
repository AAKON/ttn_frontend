import {apiClientFetch} from "@/utils/apiClient";

export async function fetchFormData() {
    return await apiClientFetch('contact-us/prep', {
        method: 'GET',
    });
}
