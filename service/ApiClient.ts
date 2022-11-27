import axios from 'axios'
import { useRouter } from 'next/router';
import { Auth } from '../extension/auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { MessageService } from './MessageService';
import { getCookie } from 'cookies-next';
import { newCookie } from '../extension/helpers';

const ApiClient = (req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest | string) => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        if (typeof req !== "string") {
            const token = await getToken({ req: req, secret: process.env.SECRET });
            if (token && token.sub?.split(',').length !== undefined && token.sub?.split(',').length > 0) {
                const jwt = token.sub?.split(',')[1];
                if (jwt && jwt.length > 0) {
                    if (request.headers !== undefined)
                        request.headers['Authorization'] = 'Bearer ' + jwt.trim();
                }
            }
        }
        else if (typeof req == "string" && req && req.length > 0) {
            if (request.headers !== undefined)
                request.headers['Authorization'] = 'Bearer ' + req.trim();
        }
        return request;
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            debugger
            console.log(error)
            // if (error.response.status === 401) {
            //     MessageService.Fails("Bạn chưa đăng nhập !");
            // }
            return Promise.reject(error);
        }
    )

    return instance
}

export default ApiClient