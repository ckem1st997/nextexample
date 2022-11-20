import NextAuth, { NextAuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrlService } from "../../../extension/env";
import { ResultMessageResponse } from "../../../model/ResultMessageResponse";
import { MessageService } from "../../../service/MessageService";

export const authOptions: NextAuthOptions = {
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
                    name: ''
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
                    console.log("data+", user.data);
                    result.email = jwt.user.userName;
                    result.id=jwt.user.id
                    result.name=jwt.user.userName;
                 //   result.data="";
                   return { id: jwt.user.id, name: jwt.user.userName, email: jwt.user.userName, image: '1111111', user: user.data };
                //  return result;
                };

                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true
        //   },
        async jwt({ token, user }) {
            debugger
            console.log("user + ", user)
            console.log("///////////")
            // token.accessToken = "accessToken"
            // token.name = "test token"
            return token
        },
        async session({ session, user }: { session: any; user: any }) {
            console.log("user -", user)
            // custom
            // session.user.name = "testttttttt";
            // session.user.old = 11111;
            return session
        }
    },
    pages: {
        signIn: "/auth/login", //Need to define custom login page (if using)
    },
};
export default NextAuth(authOptions)