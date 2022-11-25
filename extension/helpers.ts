import cookie from "cookie"

export function parseCookies(req?:any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const newCookie = {
    path: "/",
    maxAge: 50, // don vi: s
    sameSite: true,
};
