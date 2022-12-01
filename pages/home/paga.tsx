import { useQuery, dehydrate, QueryClient, DehydratedState } from "react-query";
import { useState } from "react";
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

export default function paginationSSR() {
    const { classes, theme } = useStyles();
    const { data: session } = useSession();
    const jwt = session as UserAuth;
    const service = new AxiosCustom(jwt?.jwt);
    const router = useRouter();
    const [page, setPage] = useState(parseInt(router.query.page?.toString() ?? "1") || 1);
    const data = useQuery<ResultMessageResponse<WareHouseItemDTO>, Error>(
        ["getDataWHitem", parseInt(router.query.page?.toString() ?? "1") || 1],
        async () => {
            const data = await GetData(service, parseInt(router.query.page?.toString() ?? "1") || 1)
            return data;
        },
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 50000,
            // time cache, sau 10s call api
            cacheTime: 10000,
            // onError: (error:any) =>
            // MessageService.Success("Lỗi xảy ra")
        },
    );
    function handlePaginationChange(page: number) {
        setPage(page)
        router.push(`paga/?page=${page}`, undefined, { shallow: true });
    }
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
                Rick and Morty with React Query and Pagination - Server Side rendered
            </h1>
            {/* <Pagination
                count={data?.info.pages}
                variant='outlined'
                color='primary'
                className='pagination'
                page={page}
                onChange={handlePaginationChange}
            /> */}
            <Pagination onChange={handlePaginationChange} total={((data.data !== undefined ? data.data.totalCount: 5) / 5)+1 ?? 20} boundaries={1} page={page} initialPage={page} 
            
            />
            <div className='grid-container'>
                {data.data?.data.map((character: any) => (
                    <article key={character.id}>
                        <p>{character.name}-{character.code}</p>
                    </article>
                ))}
            </div>
            {/* <Pagination
                count={data?.info.pages}
                variant='outlined'
                color='primary'
                className='pagination'
                page={page}
                onChange={handlePaginationChange}
            /> */}
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
    let page = 1;
    if (context.query.page) {
        page = parseInt(context.query?.page as string);
    }
    const service = new AxiosCustom(session?.jwt);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<ResultMessageResponse<WareHouseItemDTO>>(
        ["getDataWHitem", page],
        async () => {
            const data = await GetData(service, page)
            return data;
        }

    );
    return { props: { dehydratedState: dehydrate(queryClient) } };
}