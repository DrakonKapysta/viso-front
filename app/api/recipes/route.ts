import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const cuisine = searchParams.get("cuisine") || "";

    const url = new URL(`${BACKEND_API_URL}/recipes`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    if (search) url.searchParams.append("search", search);
    if (cuisine) url.searchParams.append("cuisine", cuisine);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch recipes" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Recipes API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") || "",
    };

    const response = await fetch(`${BACKEND_API_URL}/recipes`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to create recipe" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Create recipe API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
