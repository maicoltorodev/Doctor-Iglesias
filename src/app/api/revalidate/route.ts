import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Endpoint para invalidar el caché bajo demanda.
 * Se puede llamar después de realizar cambios en la base de datos a través del CMS.
 * También se llama automáticamente cuando se guardan cambios en el admin.
 */

function invalidateAllCaches() {
    // Invalidar todos los tags del cache (debe coincidir con contentService.ts)
    const tags = ['content', 'services', 'gallery', 'results', 'testimonials'];
    tags.forEach(tag => {
        revalidateTag(tag, 'max');
    });

    // También revalidar las rutas principales
    revalidatePath('/', 'layout');
    revalidatePath('/mobile', 'page');

    console.log('✅ Full cache invalidation: All tags and paths revalidated');
}

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');

    // Validación de seguridad
    if (token !== process.env.REVALIDATE_TOKEN && token !== 'dr-iglesias-2026-secret') {
        return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    try {
        invalidateAllCaches();

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: 'Cache invalidado correctamente (tags + paths)'
        });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidando caché', error: String(err) }, { status: 500 });
    }
}

// También soportar POST
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (token !== process.env.REVALIDATE_TOKEN && token !== 'dr-iglesias-2026-secret') {
            return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
        }

        invalidateAllCaches();

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: 'Cache invalidado correctamente (tags + paths)'
        });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidando caché', error: String(err) }, { status: 500 });
    }
}
