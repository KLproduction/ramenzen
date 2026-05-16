import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionRes = await fetch(new URL("/api/auth/session", request.url), {
    headers: request.headers,
    // Forward cookies so NextAuth can read them.
    credentials: "include",
  });

  if (sessionRes.ok) {
    const session = await sessionRes.json().catch(() => null);

    if (session?.user) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/auth/setting/:path*"],
};
