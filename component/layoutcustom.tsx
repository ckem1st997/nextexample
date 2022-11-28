import Link from "next/link";

export default function LayoutCustom({ children }: { children: any }) {
    return (
        <>
            <p>Pages</p>
            <main>{children}</main>
            {/* <footer>footer</footer> */}
        </>
    )
}