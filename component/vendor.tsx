import { Divider } from "@mantine/core"
import { ResultMessageResponse } from "../model/ResultMessageResponse"
import { VendorDTO } from "../model/VendorDTO"

function PageVendor({ data }: { data: ResultMessageResponse<VendorDTO> }) {
    return (
      <ul>
      {data.data.map((item:VendorDTO) => (
        <li key={item.id}>
          <span>{item.id}</span>
          <Divider my="sm" variant="dotted" />
          <span>{item.name}</span>
          <Divider my="sm" variant="dotted" />
          <span>{item.inactive}</span>
          </li>
      ))}
      
    </ul>
    )
    // Render data...
}


export default PageVendor