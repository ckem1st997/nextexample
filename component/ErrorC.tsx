import Link from "next/link";
import { UseQueryResult } from "react-query";

export default function ErrorC(data: UseQueryResult) {
    if (data.isLoading) {
        return <>Loading...</>
    }

    // ✅ standard error handling
    // could also check for: todos.status === 'error'
    if (data.isError) {
        return <>n error occurred</>
    }

    return <>1</>
}