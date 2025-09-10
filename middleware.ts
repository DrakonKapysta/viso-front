import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;
  console.log("Middleware token:", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/recipes/:path*", "/my-recipes/:path*", "/create-recipe/:path*"],
};
