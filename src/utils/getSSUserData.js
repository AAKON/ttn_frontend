import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

let cachedUserData;
export async function getSSUserData() {
    if (!cachedUserData) {
        const session = await getServerSession(authOptions);
        cachedUserData = {
            token: session?.accessToken,
            user:{
                full_name: session?.user?.full_name,
                user_name: session?.user?.user_name
            }
        };
    }
    return cachedUserData;
}
