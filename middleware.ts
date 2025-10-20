import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  apiProvidersRoute,
  DEFAULT_REDIRECT_ROUTE,
  loginPageRoute
} from '@/routes';
import {  NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const apiProviders = nextUrl.pathname.startsWith(apiProvidersRoute);



  if (apiProviders) return null;

  if (pathname === loginPageRoute) {
    if (isLoggedIn) {
      const urlPath = new URL(DEFAULT_REDIRECT_ROUTE, nextUrl);
      return NextResponse.redirect(urlPath);
    }
  }

  
    if (!isLoggedIn && pathname !== loginPageRoute) {
      return NextResponse.redirect(new URL(loginPageRoute, nextUrl));
    }

  
  return null
});

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

