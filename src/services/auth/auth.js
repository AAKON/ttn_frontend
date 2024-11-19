// services/auth.js
import {apiRequest} from "@/utils/api";
export async function regAuth(data, toast) {
    const endpoint = 'auth/register';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}

export async function forgotPassword(data, toast) {
    const endpoint = 'auth/forgot-password';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}

export async function resetPassword(data, toast) {
    const endpoint = 'auth/reset-password';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}
