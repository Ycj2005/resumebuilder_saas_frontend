import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const authRoutes = [
    `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  ];
  const protectedRoute = [
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/templates`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/resumesection`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/profile`,
  ];
  const pathname = req?.nextUrl?.pathname;

  const tokencookievalue = req?.cookies?.get("tokenCookie")?.value;
  console.log("**** req middleware ****", tokencookievalue);
  if (!tokencookievalue && protectedRoute.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, req.url),
    );
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWTSECRET);

    const { payload } = await jwtVerify(tokencookievalue!, secret);

    console.log("payload : ", payload);

    if (payload?.userId && authRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, req.url),
      );
    }
    return NextResponse.next();
  } catch (error) {
    console.log("error", error);
  }
  return NextResponse.next();
}

export const config = {
  //   matcher: ["/dashboard/:path*", "/"],
  matcher: [
    `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/:path*`,
  ], //runevery where just testin purpose
};
