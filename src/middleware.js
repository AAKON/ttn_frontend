const { NextResponse } = require('next/server');
const { getToken } = require('next-auth/jwt');
const {
    PROTECTED_ROUTE,
    AUTH_ROUTES,
    DEFAULT_REDIRECT
} = require('@/lib/routes');

async function middleware(req) {
    const { pathname, search } = req.nextUrl;

    // Get authentication token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = Boolean(token);

    // Check Route Types
    const isProtectedPath = pathname.startsWith(PROTECTED_ROUTE);
    const isAuthPath = AUTH_ROUTES.some(route => pathname.startsWith(route));

    // 1. If accessing protected route without being authenticated, redirect to login
    if (isProtectedPath && !isAuthenticated) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', `${pathname}${search || ''}`);
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
    matcher: ['/myaccount/:path*', '/login', '/register'],
};

module.exports = { middleware, config };
