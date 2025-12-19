import { apiRequest } from "@/utils/api";
import { getSession } from "next-auth/react";

export async function getSourcingDetails(id, token) {
    const endpoint = `sourcing-proposals/${id}`;
    const options = {
        method: 'GET',
    };
    return await apiRequest(endpoint, options, null, token);
}

export async function submitComment(id, comment, toast) {
    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `sourcing-proposals/${id}/comments`;
    const formData = new FormData();
    formData.append('comment', comment);
    
    const options = {
        method: 'POST',
        body: formData,
        isFormData: true,
    };
    return await apiRequest(endpoint, options, toast, token);
}