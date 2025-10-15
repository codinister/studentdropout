import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  loginPageRoute,
  apiProvidersRoute,
  DEFAULT_REDIRECT_ROUTE,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const apiProviders = nextUrl.pathname.startsWith(apiProvidersRoute);
  const loginPage = nextUrl.pathname.startsWith(loginPageRoute);

  if (apiProviders) return null;

  if (loginPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
    }

    return null;
  }

  if (!loginPage) {
    return Response.redirect(new URL('/', nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+%|_next).*)', '/', '/(api|trpc)(.*)'],
};
