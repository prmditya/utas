import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Kalau belum login, redirect ke /login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // manual handle di atas
    },
  }
);

// Jalankan middleware hanya di halaman home (/)
export const config = {
  matcher: ["/home"],
};
