import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrlService } from "../../../extension/env";
import { ResultMessageResponse } from "../../../model/ResultMessageResponse";
import { MessageService } from "../../../service/MessageService";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        // strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        //  maxAge: 30 * 24 * 60 * 60, // 30 days
        // thời hạn tồn tại của cookie, sau đó sẽ tự xóa khỏi trình duyệt
        maxAge: 500, // 30 days
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        //cu thao tac là sẽ refesh token
        //  updateAge: 5, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        // generateSessionToken: () => {
        //     return randomUUID?.() ?? randomBytes(32).toString("hex")
        // }
    },
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
                 const jwt = user.data;
                 if (res.ok && user && user.success && user.data && jwt.jwt) {
                     //  console.log("data+", user.data);
                     result.email = jwt.user.userName;
                     result.id = jwt.user.id + "," + jwt.jwt;
                     result.name = jwt.user.userName;
                     result.image = "";
                     return result;
                 };
                // if (credentials?.username == "admin@gmail.com") {
                //     const res = {
                //         ok: true
                //     }
                //     const user = {
                //         data: {
                //             jwt: "1",
                //             user: {
                //                 success: true,
                //                 userName: "1",
                //                 id: "1"
                //             },

                //         },
                //         success: true
                //     }
                //     // If no error and we have user data, return it
                  
                // }

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
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user'
    },
};
export default NextAuth(authOptions)