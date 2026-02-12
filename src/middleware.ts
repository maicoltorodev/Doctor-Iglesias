/**
 * MIDDLEWARE DE RUTEO - Next.js 16
 * 
 * FUNCIÓN PRINCIPAL: Interceptar todas las requests y decidir qué versión servir
 * 
 * FLUJO LÓGICO:
 * 1. Detectar tipo de dispositivo (Desktop/Mobile) via User-Agent
 * 2. Establecer header personalizado para componentes
 * 3. MODO MANTENIMIENTO: Redirigir/Reescribir a la página de remodelación
 * 4. Aplicar reglas de ruteo específicas
 * 5. Proteger rutas administrativas
 */

import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp|.*\\.png|.*\\.jpg).*)',
    ],
};

export default async function middleware(request: NextRequest) {
    // === PASO 1: DETECCIÓN DE DISPOSITIVO ===
    const userAgent = request.headers.get('user-agent') || '';
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);

    // === PASO 2: ESTABLECER HEADERS PERSONALIZADOS ===
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-is-mobile', isMobile ? 'true' : 'false');

    const url = new URL(request.url);

    // === PASO 3: REGLAS DE RUTEO ESPECÍFICAS ===

    // MODO MANTENIMIENTO: Bloquea el flujo público durante el desarrollo
    // Permitimos /admin para que el desarrollador pueda seguir trabajando en el CMS
    const isPublicRoute = !url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api');

    if (isPublicRoute && url.pathname !== '/maintenance') {
        url.pathname = '/maintenance';
        return NextResponse.rewrite(url, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    // REGLA A: Segregación Desktop/Mobile
    if (url.pathname === '/' && isMobile) {
        url.pathname = '/mobile';
        return NextResponse.rewrite(url, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    // === PASO 4: PROTECCIÓN DE RUTAS ADMIN ===
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
