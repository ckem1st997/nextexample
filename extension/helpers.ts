import cookie from "cookie"

export function parseCookies(req?: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const newCookie = {
  path: "/",
  maxAge: 50, // don vi: s
  sameSite: true,
};



export const newReturn = ((url:string) => {
  return {
    redirect: {
      permanent: false,
      destination: url,
    },
    props: {},
  }

});