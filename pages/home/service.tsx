import { Box, Button, Code, Divider, Grid, TextInput } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO } from "../../model/VendorDTO";
import PageVendor from './../../component/vendor';
import { showNotification } from '@mantine/notifications';
import { useState } from "react";
import { useForm } from '@mantine/form';
import { Service } from './../../service/callapi';
import { IconX } from "@tabler/icons";
import { MessageService } from "../../service/MessageService";


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
        </ul></Grid.Col>

      <Grid.Col span={6}>
        <PageVendor data={dataVendor}></PageVendor>

      </Grid.Col>

    </Grid>

  )
  // Render data...
}
function show(v: any) {
  console.log(v);

  // MessageService.Success("111111");
  // MessageService.Fails("111111");
  // MessageService.Info("111111");
  // MessageService.Warn("111111");

  Service.CreateUnit(v).then(x => {
    if (x.success)
      MessageService.Success("Thêm thành công !");

    else
      MessageService.Fails("Thêm thất bại !");
  });

}

// This gets called on every request
export async function getServerSideProps() {

  // Fetch data from external API
  //  const res = await fetch(`http://localhost:5005/api/v1/Unit/get-drop-tree?Active=true`)
  const data = await Service.loadUnit();
  const dataVendor = await Service.loadVendor();
  // Pass data to the page via props
  return { props: { data, dataVendor } }
}

export default Page