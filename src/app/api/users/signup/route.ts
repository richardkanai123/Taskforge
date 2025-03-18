// app/api/auth/signup/route.ts
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { NewUserSchema } from "@/lib/schemas/users";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		// validate the request data
		const isValid = NewUserSchema.safeParse(data);

		if (!isValid.success) {
			return Response.json(
				{
					success: false,
					message: isValid.error.message,
					errors: isValid.error.errors,
					cause: isValid.error.cause
				},
				{ status: 406 }
			);
		}

		const { email, password, name, username, role, image } = isValid.data;

		// Create the user with the custom fields
		await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				username,
				role,
				image: image || `https://ui-avatars.com/api/?name=${name}`,
			},
		});

		return Response.json({ success: true, message:'User created', errors:null, cause:null }, { status: 201 });
	} catch (error) {
		if ( error instanceof APIError) {

			return Response.json(
				{ success: false, errors: error.message, message:error.message,  cause: error.cause },
				{ status: 409 }
			);
		}
		return Response.json(
			{
				success: false,
				error: "Sign-up failed",
				cause: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
