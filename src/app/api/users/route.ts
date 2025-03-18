import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";
import { NextRequest } from "next/server";
import { NewUserSchema } from "@/lib/schemas/users";
import bcrypt from "bcrypt";

const saltRoundsString = process.env.SALT_ROUNDS || "10";
const saltRounds = parseInt(saltRoundsString);
export async function GET() {
	const users = await prisma.user.findMany();

	if (!users || users.length === 0) {
		return NextResponse.json({ message: "No users found" }, { status: 404 });
	}

	return NextResponse.json(users, { status: 200 });
}

// create new user
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const isValid = NewUserSchema.safeParse(body);
		if (!isValid.success) {
			return NextResponse.json(
				{ message: isValid.error.message, errors: isValid.error.errors },
				{ status: 406 }
			);
			
		}

		// check if user email already exists
		const userExists = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (userExists) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}

		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(isValid.data.password, salt);

		const newUserData = {
			email: isValid.data.email,
			password: hashedPassword,
			name: isValid.data.name,
			username: isValid.data.username,
			role: isValid.data.role,
		};

		const user = await prisma.user.create({
			data: newUserData,
		});

		return NextResponse.json(
			{ message: `User ${user.username} created successfully` },
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json(
				{ message: "An unknown server error occurred" },
				{ status: 500 }
			);
		}
	}
}
