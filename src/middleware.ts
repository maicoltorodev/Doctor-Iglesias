import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';

    // Basic mobile detection regex (matches the one previously used in lib/device.ts)
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);

    // Establecer header para componentes que lo necesiten
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-is-mobile', isMobile ? 'true' : 'false');

    const url = request.nextUrl.clone();

    // Lógica de Redirección Estática (Rewrites)
    // Si es la página de inicio y es móvil, mostramos la versión pre-renderizada móvil
    if (url.pathname === '/' && isMobile) {
        url.pathname = '/mobile';
        return NextResponse.rewrite(url, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    // Protección de Admin
    if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
        const adminSession = request.cookies.get('admin_session');
        if (!adminSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, videos, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.mp4$|.*\\.webp$|.*\\.svg$).*)',
    ],
};
