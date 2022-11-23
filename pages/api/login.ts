import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { MessageResponse } from "../../model/ResultMessageResponse";
import axios from 'axios';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { userName, passWord } = await req.body;

    try {
        let result: User = {
            isLoggedIn: false,
            login: "",
            avatarUrl: "",
            email: "",
            name: "",
            jwt: ""
        };
        const resAPI = await axios.post(process.env.MASTER_API_URL + '/AuthorizeMaster/login', { userName, passWord });
        const userAPI = await resAPI.data as Promise<MessageResponse<any>>;
        if ((await userAPI).success && (await userAPI).data !== null) {
            // If no error and we have user data, return it
            const jwt = (await userAPI).data;
            if (resAPI.data && userAPI && (await userAPI).success && (await userAPI).data && jwt.jwt) {
                //  console.log("data+", user.data);
                result.email = jwt.user.userName;
                result.name = jwt.user.userName;
                result.avatarUrl = "";
                result.jwt = jwt.jwt;
                result.isLoggedIn = jwt?.jwt !== undefined;
            };
            await SaveSession(result);
            res.json(result);
        }
        else {
            let er: string;
            if ((await userAPI).message) {
                er = (await userAPI).message
            }
            else if ((await userAPI).errors !== undefined && (await userAPI).errors.msg !== undefined && (await userAPI).errors.msg?.length > 0) {
                er = (await userAPI).errors.msg[0]
            }
            await SaveSession(result);
            res.status(500).json({ message: (await userAPI).errors.msg[0] });

        }
    }
    catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

    async function SaveSession(result: User) {
        req.session.user = result;
        await req.session.save();
    }
}