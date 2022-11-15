import Link from "next/link";

export default function Layout({ children }: { children: any }) {
    return (
        <>
            <nav>
                nav AuthenticationTitle
                <Link href="/home">Home</Link>
            </nav>
            <main>{children}</main>
            <footer>footer</footer>
        </>
    )
}