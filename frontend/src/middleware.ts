import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");

    // Nếu người dùng truy cập /admin nhưng chưa đăng nhập
    if (req.nextUrl.pathname.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Chỉ áp dụng middleware cho /admin/*
export const config = {
    matcher: ["/admin/:path*"],
};
