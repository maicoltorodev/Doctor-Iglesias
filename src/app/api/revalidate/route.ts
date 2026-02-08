import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Endpoint para invalidar el caché bajo demanda.
 * Se puede llamar después de realizar cambios en la base de datos a través del CMS.
 * Ejemplo de uso: /api/revalidate?token=TU_TOKEN_SECRETO
 */
export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');

    // Validación de seguridad
    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    try {
        // Revalidar todas las páginas principales
        revalidatePath('/', 'layout');
        revalidatePath('/mobile', 'page');

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: 'Cache invalidado correctamente'
        });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidando caché' }, { status: 500 });
    }
}

// También soportar POST
export async function POST(request: NextRequest) {
    const { token } = await request.json();

    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    try {
        // Revalidar todas las páginas principales
        revalidatePath('/', 'layout');
        revalidatePath('/mobile', 'page');

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: 'Cache invalidado correctamente'
        });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidando caché' }, { status: 500 });
    }
}
