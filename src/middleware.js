const { NextResponse } = require('next/server');
const { getToken } = require('next-auth/jwt');
const {
    ROOT,
    PROTECTED_ROUTE,
    AUTH_ROUTES,
    DEFAULT_REDIRECT
} = require('@/lib/routes');

async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Get authentication token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const currentTime = Math.floor(Date.now() / 1000);
    const isAuthenticated = token && token.accessToken && (typeof token.exp !== 'number' || token.exp > currentTime);

    // Check Route Types
    const isProtectedPath = pathname.startsWith(PROTECTED_ROUTE);
    const isAuthPath = AUTH_ROUTES.some(route => pathname.startsWith(route));
    const isPublicPath = pathname === ROOT;

    // 1. If accessing protected route without being authenticated, redirect to login
    if (isProtectedPath && !isAuthenticated) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // 2. If accessing auth routes (login/register) while authenticated, redirect to protected page
    if (isAuthPath && isAuthenticated) {
        const protectedUrl = new URL(DEFAULT_REDIRECT, req.url);
        return NextResponse.redirect(protectedUrl);
    }

    // 3. Allow public routes or any other request to pass through
    return NextResponse.next();
}

const config = {
    matcher: ['/myaccount', '/login', '/register', '/'],
};

module.exports = { middleware, config };
