import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
      });
      return NextResponse.next();
    } catch (err) {
      console.error("Error Verifying Token ", err);
    }
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
