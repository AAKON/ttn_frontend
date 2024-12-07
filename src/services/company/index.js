// services/company/index.js
import {apiRequest} from "@/utils/api";
import { getSession } from "next-auth/react";
import {getServerToken} from "@/utils/getAccessToken";

export async function getDataPreBasic() {

    const token = await getServerToken();
    const endpoint = `my/company/preparation-data/for-basic`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}

export async function companyBasicReq(data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    console.log("passed token: ", token);

    const endpoint = 'my/company/store';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast, token);
}

