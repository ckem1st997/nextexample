import { useQuery, dehydrate, QueryClient, DehydratedState } from "react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createStyles, Pagination } from "@mantine/core";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserAuth } from "../../model/UserAuth";
import { WareHouseItemDTO } from "../../model/VendorDTO";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { AxiosCustom } from "../../service/callapi";
import { useSession } from 'next-auth/react';
import { MessageService } from './../../service/MessageService';
import Error from "next/error";
const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        marginBottom: '20px'
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    can: {
        paddingLeft: '30%',
        paddingRight: '30%'
    },
    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },
    header: {
        position: 'fixed',
        zIndex: 1000,
        //  top: 0,
        left: 0,
        // right: 0,
        bottom: 0,
        marginBottom: 0,
        height: 60,//transparent
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
            }`,
    },

}));

export default function PaginationSSR(props: any) {
    const { classes, theme } = useStyles();
    const { data: session } = useSession();
    const jwt = session as UserAuth;
    const service = new AxiosCustom(jwt?.jwt);
    const router = useRouter();
    const [page, setPage] = useState(props.page);
    // if router change
    useEffect(() => {
        const handleStart = (url: any) => {
            console.log("handleStart");
        }

        const handleComplete = (url: any) => {
            console.log("handleComplete");
            setPage(1);
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            // khi thoát khỏi UI hiện tại thì trước khi thoát khỏi trang
            //Hàm clean-up chạy trước khi component bị loại bỏ khỏi UI để tránh bị rò rỉ bộ nhớ

            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
        // []: sẽ chạy duy nhất một lần vì mảng là không thay đổi
        // có thể truyền state vào, khi state thay đổi thì useEffect sẽ run
    }, [])


    //

    // useEffect(() => {
    //   console.log('useEffect'+page)

    //      return () => {
    //         setPage(1)
    //      }
    //     // []: sẽ chạy duy nhất một lần vì mảng là không thay đổi
    //     // có thể truyền state vào, khi state thay đổi thì useEffect sẽ run
    // }, [page])
    const data = useQuery<ResultMessageResponse<WareHouseItemDTO>, Error>(
        ["getDataWHitem", page || 1],
        async () => {
            const data = await GetData(service, page || 1)
            return data;
        },
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 50000,
            // time cache, sau 10s call api
            cacheTime: 10000,
            //   initialData: props.queries
            // onError: (error:any) =>
            // MessageService.Success("Lỗi xảy ra")
        },
    );
    function handlePaginationChange(pagenumber: number) {
        setPage(pagenumber)
        console.log(page)
        //  router.push(`paga/?page=${page}`, undefined, { shallow: true });
    }


    
    // const [page, setPage] = useState(parseInt(router.query.page?.toString() ?? "1") || 1);
    // const data = useQuery<ResultMessageResponse<WareHouseItemDTO>, Error>(
    //     ["getDataWHitem", parseInt(router.query.page?.toString() ?? "1") || 1],
    //     async () => {
    //         const data = await GetData(service, parseInt(router.query.page?.toString() ?? "1") || 1)
    //         return data;
    //     },
    //     {
    //         keepPreviousData: true,
    //         refetchOnMount: false,
    //         refetchOnWindowFocus: false,
    //         staleTime: 50000,
    //         // time cache, sau 10s call api
    //         cacheTime: 10000,
    //         // onError: (error:any) =>
    //         // MessageService.Success("Lỗi xảy ra")
    //     },
    // );
    // function handlePaginationChange(page: number) {
    //     setPage(page)
    //     router.push(`paga/?page=${page}`, undefined, { shallow: true });
    // }


    if (data.isLoading) {
        return 'Loading...'
    }

    // ✅ standard error handling
    // could also check for: todos.status === 'error'
    if (data.isError) {
        return 'An error occurred'
    }
    return (
        <div className={classes.can} >
            <h1>
                React Query and Pagination - Server Side rendered
            </h1>
            <Pagination onChange={handlePaginationChange} total={((data.data !== undefined ? data.data.totalCount : 5) / 5) + 1 ?? 20} boundaries={1} page={page} initialPage={page}
            />
            <div className='grid-container'>
                {data.data?.data.map((character: any) => (
                    <article key={character.id}>
                        <p>{character.name}-{character.code}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}
async function GetData(service: AxiosCustom, number: number) {
    const res = await service.whItem(number);
    return res;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions) as UserAuth;
    debugger
    const page = 1;
    // if (context.query.page) {
    //     page = parseInt(context.query?.page as string);
    // }
    const service = new AxiosCustom(session?.jwt);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<ResultMessageResponse<WareHouseItemDTO>>(
        ["getDataWHitem", page],
        async () => {
            const data = await GetData(service, page)
            return data;
        }

    );
    return { props: { dehydratedState: dehydrate(queryClient), page } };
}