import { Box, Button, Code, createStyles, Divider, Grid, Loader, ScrollArea, Stack, TextInput } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO, WareHouseItemDTO } from "../../model/VendorDTO";
import PageVendor from './../../component/vendor';
import { showNotification, useNotifications } from '@mantine/notifications';
import { useRef, useState } from "react";
import { useForm } from '@mantine/form';
import { AxiosCustom, Service } from './../../service/callapi';
import { IconX } from "@tabler/icons";
import { MessageService } from "../../service/MessageService";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from './../../extension/helpers';
import { useCookies } from "react-cookie";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserAuth } from "../../model/UserAuth";
import { useRouter } from 'next/router';
import { Card, Image, ActionIcon, Group, Text, Avatar, Badge } from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from 'next-auth/react';
import { useCounter, useWindowScroll } from "@mantine/hooks";


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
    bottom:0,
    marginBottom:0,
    height: 60,//transparent
   // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
  },

}));

interface ArticleCardFooterProps {
  image: string;
  category: string;
  title: string;
  footer: string;
  author: {
    name: string;
    description: string;
    image: string;
  };
}


function Page({ dataGet }: { dataGet: ResultMessageResponse<WareHouseItemDTO> }) {
  const { classes, theme } = useStyles();
  const { data: session } = useSession();
  const router = useRouter();
  //  // const viewport = useRef<HTMLDivElement>(null);
  //  // viewport.current?.scrollTo({ top: 0, behavior: 'smooth' });
  //   const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
  //     "infiniteCharacters",
  //     async ({ pageParam = 1 }) => 
  //     //{
  //      // const jwt = session as UserAuth;
  //      // const service = new AxiosCustom(jwt?.jwt);
  //       await fetch(
  //         `http://localhost:5005/api/v1/WareHouseItem/get-list?Skip=${pageParam*10}&Take=10`
  //       ).then((result) => result.json())
  //    // }
  //     ,
  //     {
  //       getNextPageParam: (lastPage, pages) => {
  //         console.log(lastPage.data)
  //         if (lastPage.data.length>0) {
  //           return pages.length + 1;
  //         }
  //       },
  //     }
  //   );
  //setPosts([]): reset data

  const [scroll, scrollTo] = useWindowScroll();
  //
  const [posts, setPosts] = useState(dataGet.data);
  const [hasMore, setHasMore] = useState(true);
  const jwt = session as UserAuth;
  const service = new AxiosCustom(jwt?.jwt);
  const getMorePost = async () => {
    const res = await GetData(service, posts.length);
    if (!res.data)
      setHasMore(false);
    // nối data
    setPosts((post) => [...post, ...res.data]);
  };
  return (
    <>
      <Stack align="center">
        <Group position="center">
          <Button onClick={() => { scrollTo({ y:Number.MAX_SAFE_INTEGER }) }}>Scroll to bottom</Button>
          <Button onClick={async () => {
            const reset = await GetData(service, 0); 
            setPosts(reset.data);
          }
          }
          >Reset Data</Button>

        </Group>
        <div className={classes.can}>
          <h1>
            Rick and Morty with React Query and Infinite Scroll - Client Side
            Rendered
          </h1>
          {1 == 1 && (
            <InfiniteScroll
              // 1 là kéo hết 100 % của màn hình sẽ cuộn
              scrollThreshold={1}
              //dataLength số data hiển thị tối đa, ví dụ 10 thì nếu scroll lấy dược tổng 10 data sẽ out
              dataLength={posts.length}
              next={getMorePost}
              hasMore={hasMore}
              loader={<Loader />}
            >
              <div className='grid-container'>
                <>
                  {
                    (posts.map((item: WareHouseItemDTO, i: number) => (
                      <Card key={item.id} withBorder p="lg" radius="md" className={classes.card}>
                        <Card.Section mb="sm">
                          <Image src='https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' height={180} />
                        </Card.Section>

                        <Badge>{item.id}-{i}</Badge>

                        <Text weight={700} className={classes.title} mt="xs">
                          {item.name}
                        </Text>

                        <Group mt="lg">
                          <Avatar src='https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' radius="sm" />
                          <div>
                            <Text weight={500}>{item.code}</Text>
                            <Text size="xs" color="dimmed">
                              {item.country}
                            </Text>
                          </div>
                        </Group>

                        <Card.Section className={classes.footer}>
                          <Group position="apart">
                            <Text size="xs" color="dimmed">
                              {item.unitId}
                            </Text>
                            <Group spacing={0}>
                              <ActionIcon>
                                <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
                              </ActionIcon>
                              <ActionIcon>
                                <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
                              </ActionIcon>
                              <ActionIcon>
                                <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
                              </ActionIcon>
                            </Group>
                          </Group>
                        </Card.Section>
                      </Card>
                    )))
                    // : (<p><span>Bạn không có quyền xem chức năng này !</span>{dataGet?.httpStatusCode}</p>)
                  }
                </>


              </div>
            </InfiniteScroll>
          )}

        </div>
        <Group position="center" className={classes.header}>
          <Button onClick={() => { scrollTo({ y: 0 }) }}>Scroll to top</Button>
          <Button onClick={() => {  setPosts([]) }}>Reset data</Button>
        </Group>
        {/* <InfiniteScroll
        dataLength={dataget?.totalCount * 20}
        next={() => console.log("fetching more data")}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className={classes.can}>

          {
            dataget?.httpStatusCode === 200 ?
              (dataget.data.map((item: WareHouseItemDTO) => (
                // <li key={item.id}>
                //   <span>{item.id}</span>
                //   <Divider my="sm" variant="dotted" />
                //   <span>{item.name}</span>
                //   <Divider my="sm" variant="dotted" />
                //   <span>{item.inactive}</span>
                //   <Button
                //     variant="outline"
                //     onClick={show}>
                //     Show notification
                //   </Button>
                // </li>
                <Card withBorder p="lg" radius="md" className={classes.card}>
                  <Card.Section mb="sm">
                    <Image src='https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' height={180} />
                  </Card.Section>

                  <Badge>{item.id}</Badge>

                  <Text weight={700} className={classes.title} mt="xs">
                    {item.name}
                  </Text>

                  <Group mt="lg">
                    <Avatar src='https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' radius="sm" />
                    <div>
                      <Text weight={500}>{item.code}</Text>
                      <Text size="xs" color="dimmed">
                        {item.country}
                      </Text>
                    </div>
                  </Group>

                  <Card.Section className={classes.footer}>
                    <Group position="apart">
                      <Text size="xs" color="dimmed">
                        {item.unitId}
                      </Text>
                      <Group spacing={0}>
                        <ActionIcon>
                          <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon>
                          <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon>
                          <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Card.Section>
                </Card>
              ))) : (<p><span>Bạn không có quyền xem chức năng này !</span>{dataget?.httpStatusCode}</p>)
          }


        </div>
      </InfiniteScroll> */}

        {/* <Grid> */}

        {/* <Grid.Col span={6}>
          <ul>
            {
              data.httpStatusCode === 200 ?
                (data.data.map((item: VendorDTO) => (
                  <li key={item.id}>
                    <span>{item.id}</span>
                    <Divider my="sm" variant="dotted" />
                    <span>{item.name}</span>
                    <Divider my="sm" variant="dotted" />
                    <span>{item.inactive}</span>
                    <Button
                      variant="outline"
                      onClick={show}>
                      Show notification
                    </Button>
                  </li>
                ))) : (<p><span>Bạn không có quyền xem chức năng này !</span>{data.httpStatusCode}</p>)
            }
          </ul>
        </Grid.Col> */}
        {/* </Grid> */}
      </Stack>
    </>


  )
}

async function GetData(service: AxiosCustom, number: number) {
  const res = await service.whItem(number);
  return res;
}
function show(v: any) {
  Service.CreateUnit(v).then(x => {
    if (x.success)
      MessageService.Success("Thêm thành công !");

    else
      MessageService.Fails("Thêm thất bại !");
  });

}


// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions) as UserAuth;
  let dataGet: ResultMessageResponse<WareHouseItemDTO> = {
    success: false,
    code: "",
    httpStatusCode: 0,
    title: "",
    message: "",
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: "",
    errors: {}
  };
  try {
    const service = new AxiosCustom(session?.jwt);
    dataGet = await GetData(service, 0);
    return { props: { dataGet, session } }
  }
  catch (error: any) {
    const statusCode = error.response?.status;
    if (statusCode === 401)
      return {
        redirect: {
          permanent: false,
          destination: "/401",
        },
        props: {},
      };
  }


  // return {
  //   redirect: {
  //     permanent: false,
  //     destination: "/auth/login",
  //   },
  //   props: {},
  // };

}

export default Page