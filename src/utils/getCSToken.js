import { getSession } from "next-auth/react";

let cachedToken;
export async function getCSToken() {
    if (!cachedToken) {
        const session = await getSession();
        cachedToken = session?.accessToken;
    }
    return cachedToken;
}
