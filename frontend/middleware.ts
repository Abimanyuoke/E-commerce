import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    // Redirect jika mengakses root /
    if (request.nextUrl.pathname === "/") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/auth/login";
        return NextResponse.redirect(redirectUrl);
    }

    // Proteksi untuk /main (hanya boleh diakses jika sudah login)
    if (request.nextUrl.pathname.startsWith("/main")) {
        if (!token) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/auth/login";
            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next(); // izinkan jika sudah login
    }

    // Proteksi untuk halaman /manager
    if (request.nextUrl.pathname.startsWith("/manager")) {
        if (!token || role !== "MANAGER") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/auth/login";
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    // Proteksi untuk halaman /user
    if (request.nextUrl.pathname.startsWith("/user")) {
        if (!token || role !== "USER") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/auth/login";
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    return NextResponse.next(); // default: izinkan akses
};

export const config = {
    matcher: [
        "/manager/:path*",
        "/user/:path*",
        "/main/:path*", // Tambahkan ini agar /main diproteksi
        "/" // root
    ],
};
