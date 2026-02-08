import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Endpoint para invalidar el caché bajo demanda.
 * Se puede llamar después de realizar cambios en la base de datos a través del CMS.
 * Ejemplo de uso: /api/revalidate?tag=content&token=TU_TOKEN_SECRETO
 */
export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');
    const token = request.nextUrl.searchParams.get('token');

    // Validación de seguridad simple
    // En producción, usa un TOKEN robusto en tus variables de entorno
    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ message: 'Se requiere el parámetro "tag"' }, { status: 400 });
    }

    try {
        revalidateTag(tag);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidando caché' }, { status: 500 });
    }
}

// También soportar POST por si acaso
export async function POST(request: NextRequest) {
    const { tag, token } = await request.json();

    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ message: 'Se requiere el parámetro "tag"' }, { status: 400 });
    }

    try {
        revalidateTag(tag);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidando caché' }, { status: 500 });
    }
}
