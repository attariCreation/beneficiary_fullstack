import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    // Do not protect static or API routes
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/public")) {
        return NextResponse.next();
    }

    // Read auth from cookie set by client (fallback to localStorage on client). Since we don't have server auth,
    // we only redirect root and protected routes if no client hint cookie exists.
    const cookie = req.cookies.get("beneficiary_auth_user");
    const isAuth = !!cookie?.value;

    const isLogin = pathname.startsWith("/login");
    const isProtected = ["/dashboard", "/beneficiaries", "/staff"].some((p) => pathname.startsWith(p));

    if (!isAuth && isProtected) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (isAuth && isLogin) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


