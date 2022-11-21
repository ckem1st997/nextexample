import axios from 'axios'
import { useRouter } from 'next/router';
import { Auth } from '../extension/auth';

const ApiClient = () => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        const check = await Auth.userCheck();
        if (check && check.jwt !== undefined) {
            request.headers = {
                Authorization: `${check.jwt}`
            }
        }
        return request
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                console.log(error)
            }
            console.log(`error`, error)
        }
    )

    return instance
}

export default ApiClient()