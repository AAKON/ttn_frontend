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
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}

export async function companyBasicUpdateReq(slug, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/update/${slug}`;
    const options = {
        method: 'POST',
        body: data,
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}

export async function companyOverviewReq(slug, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/overview/store-or-update`;
    const options = {
        method: 'POST',
        body: data
    };
    return await apiRequest(endpoint, options, toast, token);
}
// fetch company overview
export async function getCompanyOverview(slug) {
    const token = await getSSToken();
    const endpoint = `my/company/${slug}/overview`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}

// business contact
export async function companyBusinessContactReq(slug, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/contact/store-or-update`;
    const options = {
        method: 'POST',
        body: data
    };
    return await apiRequest(endpoint, options, toast, token);
}

// Decission maker create
export async function companyDecissionMakerReq(slug, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/decision-maker/store`;

    const options = {
        method: 'POST',
        body: data,
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}

// fetch company getDecissionMakers
export async function getDecissionMakers(slug) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/decision-maker`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.data;
}


export async function delDecissionMaker(id, slug, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/decision-maker/${id}/delete`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, toast, token);
    return result?.status && result?.code === 200;
}


export async function updateDecissionMakerReq(slug, id, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/decision-maker/${id}/update`;
    const options = {
        method: 'POST',
        body: data,
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}


// faq create
export async function companyFaqReq(slug, data, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/faq/store`;

    const options = {
        method: 'POST',
        body: data,
        isFormData: true
    };
    return await apiRequest(endpoint, options, toast, token);
}

export async function getCompanyFaqs(slug) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/faq`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, null, token);
    return result?.message?.faqs;
}

export async function delCompanyFaq(id, slug, toast) {

    const session = await getSession();
    const token = session?.accessToken;

    const endpoint = `my/company/${slug}/faq/${id}/delete`;
    const options = {
        method: 'GET'
    };
    const result = await apiRequest(endpoint, options, toast, token);
    return result?.status && result?.code === 200;
}
