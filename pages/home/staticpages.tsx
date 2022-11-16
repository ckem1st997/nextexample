function Page({ data }: { data: any }) {
    console.log(data)


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
export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:5005/api/v1/Unit/get-drop-tree?Active=true`)
    const data = await res.json();
    console.log(data)

    // Pass data to the page via props
    // sau 10s thi se call lai api de update
    // tao trang static, sau 10s thi call api va render lai chi trang nay chu khong phai toan bo cac trang
    return { props: { data },revalidate: 10 }
}

export default Page