// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
export default async (req:NextApiRequest, res:NextApiResponse): Promise<void> => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  console.log(token)
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end(JSON.stringify(token, null, 2))
}