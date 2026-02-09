/**
 * PROXY DE RUTEO - Next.js 16
 * 
 * FUNCIÓN PRINCIPAL: Interceptar todas las requests y decidir qué versión servir
 * 
 * FLUJO LÓGICO:
 * 1. Detectar tipo de dispositivo (Desktop/Mobile) via User-Agent
 * 2. Establecer header personalizado para componentes
 * 3. Aplicar reglas de ruteo específicas
 * 4. Proteger rutas administrativas
 * 
 * IMPORTANTE: Este archivo REEMPLAZA al middleware.ts deprecated
 * Es el corazón de la segregación Desktop/Mobile (Regla #1)
 */

import { NextRequest, NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
    // === PASO 1: DETECCIÓN DE DISPOSITIVO ===
    // Obtenemos User-Agent para identificar el tipo de dispositivo
    const userAgent = request.headers.get('user-agent') || '';
    
    // Regex que identifica dispositivos móviles comunes
    // NOTA: Esta misma lógica se usa en lib/device.ts para consistencia
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);

    // === PASO 2: ESTABLECER HEADERS PERSONALIZADOS ===
    // Creamos una copia de los headers originales para modificarlos
    const requestHeaders = new Headers(request.headers);
    
    // Header CRÍTICO: Usado por componentes para saber en qué dispositivo están
    // Esto permite que componentes server y client se adapten correctamente
    requestHeaders.set('x-is-mobile', isMobile ? 'true' : 'false');

    const url = new URL(request.url);

    // === PASO 3: REGLAS DE RUTEO ESPECÍFICAS ===
    
    // REGLA A: Segregación Desktop/Mobile (Regla #1 - Prioridad Máxima)
    // Si es la página principal Y es móvil → servimos versión mobile
    // Esto asegura que los móviles nunca carguen código desktop pesado
    if (url.pathname === '/' && isMobile) {
        url.pathname = '/mobile';
        
        // Rewrite: El usuario ve "/" pero internamente sirve "/mobile"
        // Mantiene URL limpia mientras sirve contenido optimizado
        return NextResponse.rewrite(url, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    // === PASO 4: PROTECCIÓN DE RUTAS ADMIN ===
    // REGLA B: Solo usuarios con sesión pueden acceder al panel admin
    if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
        // Verificamos cookie de sesión administrativa
        const adminSession = request.cookies.get('admin_session');
        
        // Si no hay sesión → redirigir a login
        if (!adminSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // === PASO 5: CONTINUAR CON REQUEST NORMALIZADA ===
    // Para todas las demás rutas, continuamos con los headers modificados
    // Esto asegura que todos los componentes reciban la info del dispositivo
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
