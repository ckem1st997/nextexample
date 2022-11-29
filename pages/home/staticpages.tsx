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
import { useRouter } from 'next/router';


function Page({ data, dataVendor }: { data: ResultMessageResponse<UnitDTO>; dataVendor: ResultMessageResponse<VendorDTO> }) {
  const [submittedValues, setSubmittedValues] = useState('');
  const router = useRouter();
  // console.log(router)
  // if (data.httpStatusCode === 401 || dataVendor.httpStatusCode === 401) {
  //   MessageService.Fails("Có lỗi xảy ra, mã lỗi: !" + data.httpStatusCode);
  //   router.push('/401')
  // }

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

            data.httpStatusCode === 200 ?

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
              ))) : (<p><span>Bạn không có quyền xem chức năng này !</span>{data.httpStatusCode}</p>)
          }
        </ul>
      </Grid.Col>

      <Grid.Col span={6}>
        {
          dataVendor.httpStatusCode !== 200 ? (<p><span>Bạn không có quyền xem chức năng này !</span>{dataVendor.httpStatusCode}</p>) : (<PageVendor data={dataVendor}></PageVendor>)
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

function show403() {
  MessageService.Fails("Bạn không có quyền !");
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions) as UserAuth;
  if (1 == 1) {
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
    const service = new AxiosCustom(session?.jwt);
    try {
      data = await service.loadUnit();
    }
    catch (error: any) {
      const statusCode = error.response.status;
      data.httpStatusCode = statusCode;
      if (statusCode === 401)
        return {
          redirect: {
            permanent: false,
            destination: "/401",
          },
          props: {},
        };
    }
    try {
      dataVendor = await service.loadVendor();
    }
    catch (error: any) {
      debugger
      const statusCode = error.response.status;
      dataVendor.httpStatusCode = statusCode;
      if (statusCode === 401)
        return {
          redirect: {
            permanent: false,
            destination: "/401",
          },
          props: {},
        };
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