// utils/api.js

import {showErrorToast, showSuccessToast} from "@/utils/toast";
async function apiRequest(endpoint, options = {}, toast) {

    const { isFormData, body, ...restOptions } = options;
    const config = {
        ...restOptions,
        headers: {
            'Content-Type': isFormData ? undefined : 'application/json',
            ...restOptions.headers,
        },
    };

    // Handle FormData if needed
    if (isFormData && body) {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });
        config.body = formData;
    } else if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, config);
        const data = await response.json();
        if (response.ok) {
            if(!data?.status && data?.code !== 200 && toast){
                if (toast) showErrorToast(toast, data?.message || 'Request failed!');
            } else if(toast) {
                showSuccessToast(toast, data?.message || 'Request successful!');
            }
            return data;
        }else {
            if (toast) showErrorToast(toast, data?.message || 'Request failed!');
            //throw new Error(data.message || 'Request faild!');
        }
    } catch (error) {
        if (toast) showErrorToast(toast, error.message || 'An error occurred');
        //throw error;
    }
}

export { apiRequest };
