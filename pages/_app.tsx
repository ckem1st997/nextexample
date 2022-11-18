import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../component/HeaderMegaMenu';
import { HeroContentLeft } from '../component/HeroContentLeft';
import Layout from './../component/layout';
import LayoutPages from '../component/layoutpage';
import axios from 'axios';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
export default function App(props: AppProps) {
  // const { Component, pageProps, router } = props;
  // let getLayout = ((page: any) => <LayoutPages>{page}</LayoutPages>);
  // axios.interceptors.response.use(
  //   //   (config) => {
  //   //     const token = localStorage.getItem('token');
  //   //     config.headers.Authorization =  token ? `Bearer ${token}` : '';
  //   //     return config;
  //   // },
  //   (res) => {
  //     console.log(11111111111)
  //     console.log(res)
  //     // Add configurations here
  //     if (res.status === 201 || res.status === 20) {
  //       console.log('Posted Successfully');
  //     }
  //     return res;
  //   },
  //   (err) => {
  //     debugger
  //     console.log(555555555555)

  //     console.log(err.response.status)
  //     if (err.response.status === 401) {
  //       getLayout = ((page: any) => <Layout>{page}</Layout>);
  //     }
  //   //  return Promise.reject(err);
  //   }
  // );
  const { Component, pageProps, router } = props;
  //props: Componet load, các thông số của page vừa load
  const getLayout = router.pathname.includes('/auth') ? ((page: any) => <Layout>{page}</Layout>)
    : ((page: any) => <LayoutPages>{page}</LayoutPages>);
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles >
          <NotificationsProvider position="top-center" zIndex={2077} autoClose={4000}>
            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );

}

