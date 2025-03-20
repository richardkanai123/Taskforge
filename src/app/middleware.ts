import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const publicPaths = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
	// Use the headers from the request object directly
	console.log('middleware')
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (
    !session &&
    !publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Remove the runtime config
  matcher: [
    // Protect all routes except public paths
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)"
  ],
};