// app/api/auth/signup/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { BetterAuthError } from "better-auth";
import { ApiError } from "next/dist/server/api-utils";
import { NewUserSchema } from "@/lib/schemas/users";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		// validate the request data
		const isValid = NewUserSchema.safeParse(data);

		if (!isValid.success) {
			return Response.json(
				{ success: false,message: isValid.error.message, errors: isValid.error.errors },
				{ status: 406 }
			);
		}

		const { email, password, name, username, role, image } = isValid.data;

		// Create the user with the custom fields
		const { user, token } = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				username,
				role,
				image: image || `https://ui-avatars.com/api/?name=${name}`,
            },
            
        });

		return Response.json({ success: true, user, token }, { status: 201 });
	} catch (error) {
		// Check specifically for "User already exists" error
		if (error instanceof ApiError || error instanceof BetterAuthError) {
			if (error.message?.includes("User already exists")) {
				return Response.json(
					{ 
						success: false, 
						error: "A user with this email already exists", 
						cause: "Duplicate Email" 
					},
					{ status: 422 }
				);
			}
			
			// Handle other API errors with 409 status
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
