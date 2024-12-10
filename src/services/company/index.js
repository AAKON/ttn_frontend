// services/company/index.js
import {apiRequest} from "@/utils/api";
import { getSession } from "next-auth/react";
import {getSSToken} from "@/utils/getSSToken";

export async function getDataPreBasic() {

    const token = await getSSToken();
    const endpoint = `my/company/preparation-data/for-basic`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}

// get company details basic
export async function getCompanyBasic(slug) {

    const token = await getSSToken();
    const endpoint = `my/company/edit/${slug}`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}

// own company list
export async function getMyCompanies() {
    const token = await getSSToken();
    const endpoint = `my/company/list`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}

export async function companyBasicReq(data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = 'my/company/store';
    const options = {
        method: 'POST',
        body: data,
        isFormData: true,
        isMultipart: true,
    };
    return await apiRequest(endpoint, options, toast, token);
}

