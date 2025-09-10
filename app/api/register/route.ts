import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Registration failed" },
        { status: response.status }
      );
    }

    const user = await response.json();

    return NextResponse.json(user, { headers: response.headers });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
