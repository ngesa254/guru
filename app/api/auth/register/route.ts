import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const { email, firstname, password } = await request.json();
        console.log({email, firstname, password});

        // Check if user already exists
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (existingUser.rows.length > 0) {
            return NextResponse.json(
                { error: "Email already exists", code: "EMAIL_EXISTS" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);
        const response = await sql`
            INSERT INTO users (email, firstname, password)
            VALUES (${email}, ${firstname}, ${hashedPassword})
        `;
        console.log(response);

        return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "An error occurred during registration", code: "REGISTRATION_ERROR" },
            { status: 500 }
        );
    }
}
