
import Link from 'next/link'
import { ButtonToggle } from '../../component/ButtonToggle'
import { IconMoonStars, IconSun } from '@tabler/icons';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

export default function About() {

    const { data: session } = useSession();
    console.log(session)
    if (session) {
        return (
            <>
                <Link href="/">Home
                </Link>
            </>
        )
    }
    return <div>Access Denied</div>
}
export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await unstable_getServerSession(
                context.req,
                context.res,
                authOptions
            ),
        },
    }
}