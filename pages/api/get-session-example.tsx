import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import { UserAuth } from "../../model/UserAuth";
import { serialize, CookieSerializeOptions } from 'cookie'
export default async (req:NextApiRequest, res:NextApiResponse<UserAuth>) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("jwtgetSession"+session);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end(JSON.stringify(session, null, 2))
}
