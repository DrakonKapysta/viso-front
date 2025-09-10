import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BACKEND_API_URL}/recipes/user/${id}`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch recipe" },
        { status: response.status }
      );
    }
    console.log("Fetched recipe successfully", response);

    const data = await response.json();
    return NextResponse.json(data, { headers: response.headers });
  } catch (error) {
    console.error("Recipe API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
