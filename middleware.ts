import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const publicPaths = ["/sign-in", "/sign-up"];
export async function middleware(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
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
	  runtime: "nodejs",
	matcher: ["/dashboard"],
};
