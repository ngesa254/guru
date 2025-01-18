import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Find the user in the database
        const result = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        const user = result.rows[0];
        console.log({result});
        console.log({email});
        console.log({user});

        // If user not found or password doesn't match, return error
        if (!user ) {
            return NextResponse.json({ error: email + " does not exist"}, { status: 401 });         
        }
        if (!(await compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });         
        }

        // Create a JWT token
        const token = sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!, // Make sure to set this in your environment variables
            { expiresIn: '1h' }
        );

        // Return success response with token
        return NextResponse.json({ token, user: { id: user.id, email: user.email, firstname: user.firstname } });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}