import NextAuth, { NextAuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrlService } from "../../../extension/env";
import { ResultMessageResponse } from "../../../model/ResultMessageResponse";
import { MessageService } from "../../../service/MessageService";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
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
                let result: User = {
                    id: '',
                    email: '',
                    name: '',
                    image: ''
                };
                //   return { id: "id nè", name: 'User', email: 'user@email.com', image: '1111111' }
                const res = await fetch(process.env.MASTER_API_URL + '/AuthorizeMaster/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();
                // If no error and we have user data, return it
                const jwt = user.data;
                if (res.ok && user && user.success && user.data && jwt.jwt) {
                    //  console.log("data+", user.data);
                    result.email = jwt.user.userName;
                    result.id = jwt.user.id + "," + jwt.jwt;
                    result.name = jwt.user.userName;
                    result.image = "";
                    return result;
                };
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token }) {
            if (token && token.sub?.split(',').length !== undefined && token.sub?.split(',').length > 0) {
                token.jwt = token.sub?.split(',')[1];
                token.userId = token.sub?.split(',')[0];
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token && token.jwt !== undefined) {
                session.jwt = token.jwt;
                session.userId = token.userId;
            };
        //    localStorage.setItem("login",session)
            return session
        }
    },
    pages: {
        signIn: "/auth/login", //Need to define custom login page (if using)
    },
};
export default NextAuth(authOptions)