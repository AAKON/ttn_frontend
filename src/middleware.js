const { NextResponse } = require('next/server');
const { getToken } = require('next-auth/jwt');
const {
    PROTECTED_ROUTE,
    AUTH_ROUTES,
    DEFAULT_REDIRECT
} = require('@/lib/routes');

async function getAuthToken(req) {
    const baseOptions = {
        req,
        secret: process.env.NEXTAUTH_SECRET,
    };

    let token = await getToken(baseOptions);
    if (token) return token;

    token = await getToken({ ...baseOptions, secureCookie: true });
    if (token) return token;

    return getToken({ ...baseOptions, secureCookie: false });
}

function isPathMatch(pathname, route) {
    return pathname === route || pathname.startsWith(`${route}/`);
}

function hasSessionCookie(req) {
    const cookieNames = req.cookies.getAll().map(cookie => cookie.name);
    return cookieNames.some(name =>
        name === 'next-auth.session-token' ||
        name.startsWith('next-auth.session-token.') ||
        name === '__Secure-next-auth.session-token' ||
        name.startsWith('__Secure-next-auth.session-token.')
    );
}

async function middleware(req) {
    const { pathname, search } = req.nextUrl;

    const token = await getAuthToken(req);
    const isAuthenticated = Boolean(token);
    const hasSession = hasSessionCookie(req);

    // Check Route Types
    const isProtectedPath = isPathMatch(pathname, PROTECTED_ROUTE);
    const isAuthPath = AUTH_ROUTES.some(route => isPathMatch(pathname, route));

    // 1. If accessing protected route without being authenticated, redirect to login
    if (isProtectedPath && !isAuthenticated && !hasSession) {
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
    matcher: ['/myaccount/:path*', '/login/:path*', '/register/:path*'],
};

module.exports = { middleware, config };
