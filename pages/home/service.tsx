function Page({ data }: { data: any }) {
    return (
        <ul>
        {data.data.map((item:any) => (
          <li key={item.id}>{item.id}-{item.unitName}</li>
        ))}
      </ul>
    )
    // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:5005/api/v1/Unit/get-drop-tree?Active=true`)
    const data = await res.json();
    console.log(data)

    // Pass data to the page via props
    return { props: { data } }
}

export default Page