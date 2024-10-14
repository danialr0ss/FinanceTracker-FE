import { NextResponse } from "next/server";

export async function middleware(request) {
  const currUrl = request?.nextUrl?.pathname;
  const token = request.cookies.get("token")?.value;
  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
      });
      if (currUrl === "/login" || currUrl === "/register") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Error Verifying Token ", err);
    }
  } else {
    if (currUrl === "/login" || currUrl === "/register") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|homeImage.jpg|loginImage.gif|registerImage.jpeg).*)",
  ],
};
