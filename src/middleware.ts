import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("authorization")?.value;

    if (request.nextUrl.pathname === "/redirect") {
        const token = request.nextUrl.searchParams.get("token");
        const name = request.nextUrl.searchParams.get("name");
        const email = request.nextUrl.searchParams.get("email");
        const image = request.nextUrl.searchParams.get("image");

        if (!token || token === "error" || !name || !email || !image) {
            return NextResponse.redirect(new URL("/sign_in", request.url));
        }

        const response = NextResponse.next()
        const config = {
            maxAge: (9 * 60 * 60),
            secure: false,
        }
        response.cookies.set("authorization", token, config);
        response.cookies.set("_username", name, config);
        response.cookies.set("_email", email, config);
        response.cookies.set("_image", image, config);

        return response;
    }

    else if (request.nextUrl.pathname.startsWith("/app") && !authToken) {
        return NextResponse.redirect(new URL("/sign_in", request.url));
    }
}

export const config = {
    matcher: ['/redirect', '/app/:path*'],
}