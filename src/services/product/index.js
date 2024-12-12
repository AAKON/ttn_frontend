// services/company/index.js
import {apiRequest} from "@/utils/api";
import { getSession } from "next-auth/react";


export async function uploadProductReq(data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = 'my/company/tech/product/store';
    const options = {
        method: 'POST',
        body: data,
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}

