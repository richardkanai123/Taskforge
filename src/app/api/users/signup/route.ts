// app/api/auth/signup/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { BetterAuthError } from "better-auth";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const { email, password, name, username, role } = data;

		// Create the user with the custom fields
		const { user, token } = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				username,
				role,
            },
            
        });

		return Response.json({ success: true, user, token }, { status: 201 });
	} catch (error) {
		console.error("Sign-up error:", error);
		if (error instanceof ApiError || error instanceof BetterAuthError) {
			return Response.json(
				{ success: false, error: error.message, cause: error.cause },
				{ status: 409 }
			);
		}
	}
	return Response.json(
		{ success: false, error: "Sign-up failed", cause: "Internal Server Error" },
		{ status: 500 }
	);
}
