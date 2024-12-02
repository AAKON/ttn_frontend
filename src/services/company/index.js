// services/company/index.js
import {apiRequest} from "@/utils/api";
import { getSession } from "next-auth/react";

export async function companyBasicReq(data, toast) {

    console.log(data, 'fr data company');

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = 'my/company/store';
    const options = {
        method: 'POST',
        body: data,
        isFormData: false,
    };
    return await apiRequest(endpoint, options, toast, token);
}
