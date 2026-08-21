import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/login', req.url));
    const { data: user } = await supabase.from('User').select('isAdmin').eq('id', session.user.id).single();
    if (!user?.isAdmin) return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return res;
}
