import { type NextRequest, NextResponse } from "next/server";

// Authentication disabled temporarily for preview
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
