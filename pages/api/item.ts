// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { VendorDTO } from "../../model/VendorDTO";
import { ResultMessageResponse } from "../../model/ResultMessageResponse";
import { Auth } from "../../extension/auth";
import globalAPICall, { AxiosCustom } from "../../service/callapi";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { UserAuth } from "../../model/UserAuth";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    try {
        const session = await unstable_getServerSession(req, res, authOptions);
        const service=new AxiosCustom(req);
      //  await globalAPICall(req, res, {POST,GET})
        const result = await service.whItem();
        if (result !== undefined) {
            res.status(200).end(JSON.stringify(result, null, 2))
        } else {
            // Not Signed in
            res.status(401)
        }
    } 
    catch (error) {
        console.log(error)
        if(error)
        res.status(500)
    }
  
 


    // res.end();
}


/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
//  export default async function handler(req, res) {

//     async function POST() {
//       const { email, password, username } = req.body;
//       if (!username) {
//         throw new MyError('Username required', 400)
//       }
//       await CreateUser(email, password, username)
//       res.status(201).send();
//     }

//     async function GET() {
//       const result = await ListUsers()
//       res.status(200).json(result);
//     }


//     await globalAPICall.js(req, res, {POST, GET})

// }