import axios from "axios"
import { MessageResponse, ResultMessageResponse } from "../model/ResultMessageResponse";
import { baseUrlService } from "./env";
import { getSession, useSession } from 'next-auth/react';
import { UserAuth } from "../model/UserAuth";


const userEmail = `admin@example.com`
const userPassword = "123456"
const baseUrl = baseUrlService.baseUrlMaster;
export class User {
    id!: string;
    username!: string;
    role!: number;
    token?: string;
}

export const Auth = {
    signIn,
    userCheck,
    signOut
}


async function signIn(username: string, password: string): Promise<MessageResponse<any>> {
    const { data: session } = useSession();
    const res = await axios.post(baseUrl + '/AuthorizeMaster/login', { username, password });
    const datares = await res.data as Promise<MessageResponse<any>>;
    if ((await datares).success) {
        const user = (await datares).data;
        var save = new User();
        save.username = username;
        save.token = user.jwt;
        save.id = user.user.id;
        // localStorage.setItem('user', JSON.stringify(save));
    }
    return datares;
}
function userValue(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
}
async function userCheck() {
    const session = await getSession() as UserAuth;
    return session;
}
//    const { data: session, status } = useSession();

function signOut() {
    console.log("sign out")
    localStorage.removeItem("user")
}