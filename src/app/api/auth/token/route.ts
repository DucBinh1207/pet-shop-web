import { CookieKey } from "@/constants/cookie-key";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return Response.json({ message: "Failed" }, { status: 401 });
    }

    cookies().set({
      name: CookieKey.AUTH_TOKEN,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 3600 * 24 * 60,
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(CookieKey.AUTH_TOKEN);

    if (!token) {
      return new Response("No token found", {
        status: 401,
      });
    }
    return Response.json(token.value);
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (token) {
      cookies().delete(CookieKey.AUTH_TOKEN);
    } else {
      return new Response("No token found", {
        status: 400,
      });
    }
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
