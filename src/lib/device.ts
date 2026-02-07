import { headers } from 'next/headers';

export async function isMobileDevice(): Promise<boolean> {
    const headersList = await headers();
    // El middleware ya se encargó de procesar el User-Agent
    // y establecer este header personalizado.
    return headersList.get('x-is-mobile') === 'true';
}

