import {apiRequest} from "@/utils/api";

export async function submitContactForm(data, toast) {
    const endpoint = 'contact-us/submit';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}
