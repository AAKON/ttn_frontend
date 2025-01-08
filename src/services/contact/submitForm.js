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

export async function submitCompanyEmail(data, toast) {
    const endpoint = 'company-email/submit';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}

export async function submitCompanyReport(data, toast) {
    const endpoint = 'company-report/submit';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}
