import { Box, Button, Code, Divider, Grid, TextInput } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO } from "../../model/VendorDTO";
import {  Service } from "../../service/callapi";
import PageVendor from './../../component/vendor';
import { showNotification } from '@mantine/notifications';
import { useState } from "react";
import { useForm } from '@mantine/form';
function Page({ data, dataVendor }: { data: ResultMessageResponse<UnitDTO>; dataVendor: ResultMessageResponse<VendorDTO> }) {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      age: '33',
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
      age: Number(values.age) || 0,
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
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last name"
              placeholder="Last name"
              mt="md"
              {...form.getInputProps('lastName')}
            />
            <TextInput
              type="number"
              label="Age"
              placeholder="Age"
              mt="md"
              {...form.getInputProps('age')}
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
  if (v.age > 10)
    showNotification({
      title: 'Default notification',
      message: 'Hey there, your code is awesome! 🤥',
    })
  else
    showNotification({
      title: v.fullName,
      message: v.age,
    })
}
export async function getStaticProps() {
  // Fetch data from external API
  //  const res = await fetch(`http://localhost:5005/api/v1/Unit/get-drop-tree?Active=true`)
  
    // const res1 = await fetch('/api/get-session-example')
    // const user1 = await res1;
  const data = await fetch('http://localhost:3000/api/wareHouseItemCategory');
  const dataVendor =await fetch('http://localhost:3000/api/item');
  // Pass data to the page via props
  // trong moi truong dev, se luon call api
  // trong moi truong porduction, sau 100s thuc hien call lai api

  return { props: { data, dataVendor }, revalidate: 100, }
}
// let kk: ResultMessageResponse<VendorDTO> = {
//   success: false,
//   code: '',
//   httpStatusCode: 0,
//   title: '',
//   message: '',
//   data: [],
//   totalCount: 0,
//   isRedirect: false,
//   redirectUrl: '',
//   errors: {}
// }
// const [data, setData] = useState(kk);
// useEffect(() => {
//   Service.whItem().then(x => setData(x));
// }, [])
export default Page
