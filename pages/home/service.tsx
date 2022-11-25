import { Box, Button, Code, Divider, Grid, TextInput } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO } from "../../model/VendorDTO";
import PageVendor from './../../component/vendor';
import { showNotification } from '@mantine/notifications';
import { useState } from "react";
import { useForm } from '@mantine/form';
import { AxiosCustom, Service } from './../../service/callapi';
import { IconX } from "@tabler/icons";
import { MessageService } from "../../service/MessageService";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from './../../extension/helpers';
import { useCookies } from "react-cookie";


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
          {data.data.map((item: UnitDTO) => (
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
          ))}
        </ul>
      </Grid.Col>

      <Grid.Col span={6}>
        {
          data && (<>{ }</>)
        }  <PageVendor data={dataVendor}></PageVendor>
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

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // dùng này khi đăng nhập, chuyển trang sẽ hơi khó
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  // Fetch data from external API
  // const res = await fetch(`http://localhost:3000/api/item`)
  const service = new AxiosCustom(context.req);
  const data = await service.loadUnit();
  const dataVendor = await service.loadVendor();
  // Pass data to the page via props
  return { props: { data, dataVendor } }
}

export default Page