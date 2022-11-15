import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../component/HeaderMegaMenu';
import { HeroContentLeft } from '../component/HeroContentLeft';
import Layout from './../component/layout';
import LayoutPages from '../component/layoutpage';

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;
  // props: Componet load, các thông số của page vừa load
  const getLayout = router.pathname.includes('/auth') ? ((page: any) => <Layout children={page} />)
    : ((page: any) => <LayoutPages children={page} />);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
  
}
export const getServerSideProps = (async function ({ req, res }) {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})

