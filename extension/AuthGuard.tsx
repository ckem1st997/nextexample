// AuthGuard.tsx
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from 'react';
import { Auth } from "./auth";
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';

export function AuthGuard({ children }: { children: any }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log(session,status)
    useEffect(() => {
        //auth is initialized and there is no user
        if (!session || status !== 'authenticated') {
            // remember the page that user tried to access
            // redirect
            router.push("/auth/login")

        }
    }, [router,status])


    // if auth initialized with a valid user show protected page
    if (session && status === 'authenticated') {
        return <>{children}</>
    }

    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
}
