// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { VendorDTO } from "../../model/VendorDTO";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { AxiosCustom } from "../../service/callapi";
import { UserAuth } from "../../model/UserAuth";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await unstable_getServerSession(req, res, authOptions) as UserAuth;
    const service=new AxiosCustom(session.jwt);
    const result = await service.WareHouseItemCategory();
    if (result !== undefined) {
        res.end(JSON.stringify(result));
    } else {
        // Not Signed in
        res.status(401)
    }
}
