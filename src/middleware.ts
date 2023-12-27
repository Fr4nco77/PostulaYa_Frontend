import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("authorization")?.value;

    if (request.nextUrl.pathname === "/auth") {
        return NextResponse.redirect(new URL("/auth/sign_in", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/app") && !authToken) {
        return NextResponse.redirect(new URL("/auth/sign_in", request.url));
    }
}

export const config = {
    matcher: ['/auth', '/app/:path*'],
}