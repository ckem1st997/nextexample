// AuthGuard.tsx
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from 'react';
import { Auth } from "./auth";
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
// import { useCookies } from 'react-cookie';
import { newCookie, parseCookies } from "./helpers";
import { hasCookie, setCookie } from 'cookies-next';
export function AuthGuard({ children }: { children: any }) {
    const router = useRouter();
    //  const [cookie, setCookie] = useCookies(["user"]);
    // console.log(cookie)

    const { data: session, status } = useSession();
    useEffect(() => {
        //auth is initialized and there is no user
        if (!session || status !== 'authenticated' || session?.user === undefined) {
            // remember the page that user tried to access
            // redirect
            router.push("/auth/login")
        }
        else {
            const data = parseCookies();
            // console.log("data lll "+data)
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                if (!hasCookie('user', newCookie)) {
                    setCookie('user', JSON.stringify(session), newCookie);
                }
            }
            // setCookie("user", JSON.stringify(data), {
            //     path: "/",
            //     maxAge: 3600, // Expires after 1hr
            //     sameSite: true,
            //   })
        }
    }, [router, status])


    // if auth initialized with a valid user show protected page
    if (session && status === 'authenticated') {
        return <>{children}</>
    }

    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
}
