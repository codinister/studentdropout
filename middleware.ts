const runtime = 'nodejs'


import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';
import {
  apiProvidersRoute,
  DEFAULT_REDIRECT_ROUTE,
  loginPageRoute,
} from '@/routes';

// Initialize NextAuth
const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // Skip middleware for API provider routes
  if (pathname.startsWith(apiProvidersRoute)) {
    return NextResponse.next();
  }

  // If user is logged in and visits the login page, redirect to dashboard
  if (isLoggedIn && pathname === loginPageRoute) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, req.url));
  }

  // If user is not logged in and tries to access a protected route
  if (!isLoggedIn && pathname !== loginPageRoute) {
    return NextResponse.redirect(new URL(loginPageRoute, req.url));
  }

  // Allow the request
  return NextResponse.next();
});

// Matcher to control which paths middleware runs on
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
