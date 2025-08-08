import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = [
  '/upload-recipe',
  '/my-recipes/uploads',
  '/my-recipes/saved',
  '/my-recipes/liked',
  '/settings',
];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: 'savorypoint',
  });

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (isProtectedRoute && !sessionCookie) {
    const redirectURL = new URL('/sign-in', request.nextUrl);
    redirectURL.searchParams.set('redirect', path);
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
