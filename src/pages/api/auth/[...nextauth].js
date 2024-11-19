// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

                const res = await fetch(loginUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user.data) {
                    const tokenPayload = JSON.parse(atob( user?.data?.access_token.split('.')[1]));
                    console.log(tokenPayload, 'get access user');
                    return{
                        accessToken: user?.data?.access_token,
                        exp: tokenPayload.exp,
                        name: user?.data?.name,
                        user_name: user?.data?.name,
                        // email: tokenPayload.email,
                        // profile_image: tokenPayload.profile_image,
                    }
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log('get access callback');
                token.accessToken = user.accessToken;
                token.exp = user.exp;
                token.name = user.name;
                token.user_name = user.name;
                // token.email = user.email;
                // token.picture = user.profile_image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                full_name: token.name,
                user_name: token.user_name,
                // email: token.email,
                // profile_image: token.picture,
            };
            session.accessToken = token.accessToken;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);
