import axios from 'axios'

const ApiClient = () => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        // const session = await getSession()

        // if (session) {
        //     request.headers.common = {
        //         Authorization: `${session.token.accessToken}`
        //     }
        // }
        return request
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                //       getLayout = ((page: any) => <Layout>{page}</Layout>);
            }
            console.log(`error`, error)
        }
    )

    return instance
}

export default ApiClient()