import { Box, Button, Code, Divider, Grid, TextInput } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO } from "../../model/VendorDTO";
import PageVendor from './../../component/vendor';
import { showNotification, useNotifications } from '@mantine/notifications';
import { useState } from "react";
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


function Page({ data, dataVendor }: { data: ResultMessageResponse<UnitDTO>; dataVendor: ResultMessageResponse<VendorDTO> }) {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      id: '',
      unitName: '',
      inactive: true,
    },

    transformValues: (values) => ({
      id: '',
      unitName: `${values.unitName}`,
      inactive: values.inactive || true,
    }),
  });



  return (

    <Grid>
      <Grid.Col span={6}>
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              show(values))
            }
          >
            <TextInput
              label="First name"
              placeholder="First name"
              {...form.getInputProps('id')}
            />
            <TextInput
              label="unitName"
              placeholder="Last name"
              mt="md"
              {...form.getInputProps('unitName')}
            />
            <TextInput
              type="number"
              label="inactive"
              placeholder="Age"
              mt="md"
              {...form.getInputProps('inactive')}
            />
            <Button type="submit" mt="md">
              Submit
            </Button>
          </form>

          {submittedValues && <Code block>{submittedValues}</Code>}
        </Box>
        <ul>
          {

            data.code === "200" ?

              (data.data.map((item: UnitDTO) => (
                <li key={item.id}>
                  <span>{item.id}</span>
                  <Divider my="sm" variant="dotted" />
                  <span>{item.unitName}</span>
                  <Divider my="sm" variant="dotted" />
                  <span>{item.inactive}</span>
                  <Button
                    variant="outline"
                    onClick={show}
                  >
                    Show notification
                  </Button>
                </li>
              ))) : (<p>{data.code}</p>)
          }
        </ul>
      </Grid.Col>

      <Grid.Col span={6}>
        {
          dataVendor.code !== "200" ? (<p>{dataVendor.code}</p>) : (<PageVendor data={dataVendor}></PageVendor>)
        }
      </Grid.Col>
    </Grid>

  )
}
function show(v: any) {
  Service.CreateUnit(v).then(x => {
    if (x.success)
      MessageService.Success("Thêm thành công !");

    else
      MessageService.Fails("Thêm thất bại !");
  });

}

function show403(){
  MessageService.Fails("Bạn không có quyền !");
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // dùng này khi đăng nhập, chuyển trang sẽ hơi khó
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // Fetch data from external API
  // const res = await fetch(`http://localhost:3000/api/item`)
  const session = await unstable_getServerSession(context.req, context.res, authOptions) as UserAuth;
  if (session) {
    let data: ResultMessageResponse<UnitDTO> = {
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
    let dataVendor: ResultMessageResponse<VendorDTO> = {
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
    }
    const service = new AxiosCustom(session.jwt);
    try {
      data = await service.loadUnit();
      //  return { props: { data, dataVendor } }
    }
    catch (error: any) {
      const statusCode = error.response.status;
      data.code = statusCode;
      // if (statusCode === 403) {
      //     MessageService.Fails("Bạn không có quyền thực hiện thao tác này !");
      // }
      // hiện đang xử lý, nếu có code != 200 thì chuyển trang khác
      // sau sẽ từ mã lỗi mà có thể chuyển trang hoặc hiển thị những phần được phân quyền để lấy data
      // hoặc thông báo
      // ví dụ: call 2 api, api nào get được data sẽ show component
      // api nào trả về 401, hoặc 403 thì sẽ hiện noti hoặc không hiện dữ liệu chỗ call api đó, hoặc chuyển trang
      // tuỳ vào nghiệp vụ của từng trang nha
      // return {
      //   // redirect: {
      //   //   permanent: false,
      //   //   destination: "/401",
      //   // },
      //   props: {},
      // };
    }
    try {
      // const service = new AxiosCustom(session.jwt);
      // const data = await service.loadUnit();
      dataVendor = await service.loadVendor();
      // Pass data to the page via props
      // return { props: { data, dataVendor } }
    }
    catch (error: any) {
      const statusCode = error.response.status;
      dataVendor.code = statusCode;
      // if (statusCode === 403) {
      //     MessageService.Fails("Bạn không có quyền thực hiện thao tác này !");
      // }
      // hiện đang xử lý, nếu có code != 200 thì chuyển trang khác
      // sau sẽ từ mã lỗi mà có thể chuyển trang hoặc hiển thị những phần được phân quyền để lấy data
      // hoặc thông báo
      // ví dụ: call 2 api, api nào get được data sẽ show component
      // api nào trả về 401, hoặc 403 thì sẽ hiện noti hoặc không hiện dữ liệu chỗ call api đó, hoặc chuyển trang
      // tuỳ vào nghiệp vụ của từng trang nha
      //  return {
      // redirect: {
      //   permanent: false,
      //   destination: "/401",
      // },
      //   props: {},
      // };
    }
    return { props: { data, dataVendor } }
  }

  else
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };

}

export default Page