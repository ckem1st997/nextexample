import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../component/HeaderMegaMenu';
import { HeroContentLeft } from '../component/HeroContentLeft';

// phần hiển thị trên google sẽ show trong thẻ head
// phần header và footer (nếu có) dự tính sẽ sử dụng client side rendering và dạng tĩnh, 
// có cache để tránh call api nhiều lần
// trang quản trị thì 100% là client side rendering vì không cần SEO
// các trang page bình thường để xem nội dung thì 100% là serve side rendering
// trang nào mà api ít thay đổi hoặc không thay đổi thì có thể dùng getStaticProps với revalidate tuỳ ý
// trang nào mà hay dùng api, các trang detalis, login, check role thì có thể dùng getServeProps để real time api
// chú ý phần các key phân quyền, sẽ check nếu key không hoạt động thì được phép truy cập, còn hoạt động thì mới check quyền

export default function LayoutPages({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <HeaderMegaMenu />
      {children}
    </>
  );
}

