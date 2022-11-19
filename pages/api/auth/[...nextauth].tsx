import NextAuth, { RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrlService } from "../../../extension/env";
import { ResultMessageResponse } from "../../../model/ResultMessageResponse";
import { MessageService } from "../../../service/MessageService";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                return JSON.stringify(credentials);
                const res = await fetch(baseUrlService.baseUrlMaster + '/AuthorizeMaster/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();
                // If no error and we have user data, return it
                const jwt = user.data;
                if (res.ok && user && user.success && user.data && jwt.jwt) {
                    return user.data;
                };

                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }: { session: any; token: any }) => {
            session.user = token.user;  // Setting token in session
            return session;
        },
    },
    pages: {
        signIn: "/auth/login", //Need to define custom login page (if using)
    },
});