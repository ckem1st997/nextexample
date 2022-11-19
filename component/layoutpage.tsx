import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../component/HeaderMegaMenu';
import { HeroContentLeft } from '../component/HeroContentLeft';
import { AuthGuard } from './../extension/AuthGuard';
import Router from 'next/router';
import { useSession } from 'next-auth/react';


export default function LayoutPages({ children }: { children: any }) {
  const { data: session, status } = useSession()
  console.log(session,status);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthGuard>
        <HeaderMegaMenu />
        {children}
      </AuthGuard>

    </>
  );
}

