// AuthGuard.tsx
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from 'react';
import { Auth } from "./auth";
import { signOut, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
// import { useCookies } from 'react-cookie';
import { newCookie, parseCookies } from "./helpers";
import { hasCookie, setCookie } from 'cookies-next';
export function AuthGuard({ children }: { children: any }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        //auth is initialized and there is no user
        if (!session || status !== 'authenticated' || session?.user === undefined) {
            console.log("AuthGuard")
            router.push('/auth/login?callbackUrl=' + router.asPath)
        }
        else {
            const data = parseCookies();
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                if (!hasCookie('user', newCookie)) {
                    setCookie('user', JSON.stringify(session), newCookie);
                }
            }
        }
    }, [router, status])


    // if auth initialized with a valid user show protected page
    if (session && status === 'authenticated') {
        return <>{children}</>
    }

    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
}
