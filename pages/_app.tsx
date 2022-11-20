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
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';
export default function App(props: AppProps<{ session: Session }>) {
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
  const { Component, pageProps: { session, ...pageProps }, router } = props;
  //props: Componet load, các thông số của page vừa load
  const getLayout = router.pathname.includes('/auth') ? ((page: any) => <Layout>{page}</Layout>)
    : ((page: any) => <LayoutPages>{page}</LayoutPages>);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  // phần hiển thị trên google sẽ show trong thẻ head
  // phần header và footer (nếu có) dự tính sẽ sử dụng client side rendering và dạng tĩnh, 
  // có cache để tránh call api nhiều lần
  // trang quản trị thì 100% là client side rendering vì không cần SEO
  // các trang page bình thường để xem nội dung thì 100% là serve side rendering
  // trang nào mà api ít thay đổi hoặc không thay đổi thì có thể dùng getStaticProps với revalidate tuỳ ý
  // trang nào mà hay dùng api, các trang detalis, login, check role thì có thể dùng getServeProps để real time api
  // chú ý phần các key phân quyền, sẽ check nếu key không hoạt động thì được phép truy cập, còn hoạt động thì mới check quyền

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles >
          <NotificationsProvider position="top-center" zIndex={2077} autoClose={3000}>
            <SessionProvider session={session}>
              {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );

}

