import { Divider, Grid } from "@mantine/core";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { UnitDTO } from "../../model/UnitDTO";
import { VendorDTO } from "../../model/VendorDTO";
import { loadUnit, loadVendor } from "../../service/callapi";
import PageVendor from './../../component/vendor';

function Page({ data, dataVendor }: { data: ResultMessageResponse<UnitDTO>; dataVendor: ResultMessageResponse<VendorDTO> }) {
  return (

    <Grid>
      <Grid.Col span={6}>
        <ul>
          {data.data.map((item: UnitDTO) => (
            <li key={item.id}>
              <span>{item.id}</span>
              <Divider my="sm" variant="dotted" />
              <span>{item.unitName}</span>
              <Divider my="sm" variant="dotted" />
              <span>{item.inactive}</span>
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

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  //  const res = await fetch(`http://localhost:5005/api/v1/Unit/get-drop-tree?Active=true`)
  const data = await loadUnit();
  const dataVendor = await loadVendor();
  // Pass data to the page via props
  return { props: { data, dataVendor } }
}

export default Page