// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const APE_AUTH_TOKEN = process.env.APE_AUTH_TOKEN || 'default_secret_token';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === APE_AUTH_TOKEN) {
    const cookieStore = cookies();
    cookieStore.set('ape-auth-token', APE_AUTH_TOKEN, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return NextResponse.json({ message: 'Autenticado' });
  }

  return new NextResponse('Acceso denegado', { status: 401 });
}
