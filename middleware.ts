import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { MessageService } from './service/MessageService';
import { getToken } from 'next-auth/jwt';


export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const token = await getToken({ req: req, secret: process.env.SECRET });

  if (token && token.sub?.split(',').length !== undefined && token.sub?.split(',').length > 0) {
  }
  else
    return NextResponse.redirect(new URL('/auth/login?callbackUrl=' + req.nextUrl.pathname, req.url))

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // console.log("from middleware", req);

  // demo:
  // if (!user?.isLoggedIn) {
  //   //return new NextResponse(null, { status: 403 }); // unauthorized to see pages inside admin/
  //   return NextResponse.redirect(new URL('/auth/login?callBackUrl=' + req.nextUrl.pathname, req.url))
  // }

  return res;
};

export const config = {
  matcher: "/home/:path*",
};

// export const config = {
//   matcher: '/home/:path*',
// }
