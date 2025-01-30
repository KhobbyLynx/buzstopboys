import { NextResponse, NextRequest } from "next/server";
import { parse } from "cookie";

export async function middleware(request: NextRequest) {
  console.log("Middleware running");

  // Access cookies from headers
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);

  const userData = cookies.userData ? JSON.parse(cookies.userData) : null;

  if (!userData) {
    console.log("No user is logged in @ Middleware");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const isAdmin = userData.role === "admin";

    if (!isAdmin) {
      console.log("User is not an admin");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Error fetching patron info:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("User is logged in and is an admin");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
