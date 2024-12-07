import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

let cachedToken;
export async function getServerToken() {
    if (!cachedToken) {
        const session = await getServerSession(authOptions);
        cachedToken = session?.accessToken;
    }
    return cachedToken;
}
