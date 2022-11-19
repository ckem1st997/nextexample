// AuthGuard.tsx
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from 'react';
import { Auth } from "./auth";

export function AuthGuard({ children }: { children: any }) {
    const router = useRouter();
    const user = Auth;
    const check = user.userCheck();
    console.log(!user || !check)
    useEffect(() => {
        //auth is initialized and there is no user
        if (!user || !check) {
            // remember the page that user tried to access
            // redirect
            router.push("/auth/login")

        }
    }, [router, user])


    // if auth initialized with a valid user show protected page
    if (user) {
        return <>{children}</>
    }

    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
}
