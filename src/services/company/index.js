// services/company/index.js
import {apiRequest} from "@/utils/api";
export async function companyBasicReq(data, toast) {
    const endpoint = 'my/company/store';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast);
}
