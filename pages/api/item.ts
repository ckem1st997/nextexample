// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { VendorDTO } from "../../model/VendorDTO";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { Auth } from "../../extension/auth";
import { AxiosCustom } from "../../service/callapi";
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const service=new AxiosCustom(req);
    const result = await service.whItem();
    if (result !== undefined) {
        res.end(JSON.stringify(result));
    } else {
        // Not Signed in
        res.status(401)
    }
    // res.end();
}