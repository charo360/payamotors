import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === '/admin/login' ||
    path === '/login' ||
    path === '/register' ||
    !path.startsWith('/admin') && !path.startsWith('/dashboard');

  // Check if the user is authenticated
  const authCookie = request.cookies.get('firebase-auth-token')?.value;
  const isAuthenticated = !!authCookie;

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to appropriate login page based on the path
    let redirectUrl;
    if (path.startsWith('/admin')) {
      redirectUrl = new URL('/admin/login', request.url);
    } else {
      redirectUrl = new URL('/login', request.url);
    }
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated) {
    // Handle authenticated users trying to access login pages
    if (path === '/admin/login') {
      // Redirect admin users to admin dashboard, regular users to their dashboard
      const userRole = request.cookies.get('user-role')?.value;
      const redirectUrl = userRole === 'admin'
        ? new URL('/admin', request.url)
        : new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (path === '/login' || path === '/register') {
      // Redirect to appropriate dashboard based on role
      const userRole = request.cookies.get('user-role')?.value;
      const redirectUrl = userRole === 'admin'
        ? new URL('/admin', request.url)
        : new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/admin',
    '/dashboard/:path*',
    '/dashboard',
    '/login',
    '/register',
  ],
};
