import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if user is authenticated
  const session = await auth();

  // If accessing dashboard routes without authentication, redirect to sign-in
  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
