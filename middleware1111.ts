
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Auth } from './extension/auth';
import { authOptions } from './pages/api/auth/[...nextauth]';
import { UserAuth } from './model/UserAuth';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request, secret: process.env.SECRET });
  const requestHeaders = new Headers(request.headers)
  // You can also set request headers in NextResponse.rewrite

  if (token && token.sub?.split(',').length !== undefined && token.sub?.split(',').length > 0) {
    const jwt = token.sub?.split(',')[1];
    if (jwt && jwt.length > 0) {
      requestHeaders.append('Authorization', `Bearer ${jwt.trim()}`)
      //   response.headers.set('Authorization', `Bearer ${jwt.trim()}`)
    }
  }

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })



  // Set a new response header `x-hello-from-middleware2`
  console.log(requestHeaders)
  return response
}

// export const config = {
//   matcher: '/home/:path*',
// }
