// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const APE_AUTH_TOKEN = process.env.APE_AUTH_TOKEN || 'default_secret_token';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('ape-auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Si el usuario intenta acceder a cualquier ruta que no sea /login
  // y no tiene el token correcto, se le redirige a /login.
  if (pathname !== '/login' && authToken !== APE_AUTH_TOKEN) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si el usuario está autenticado e intenta acceder a /login,
  // se le redirige al dashboard.
  if (pathname === '/login' && authToken === APE_AUTH_TOKEN) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Rutas que serán protegidas por el middleware
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
