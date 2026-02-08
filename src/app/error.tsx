'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const DesktopError = dynamic(() => import('@/components/sections/desktop/Error'));
const MobileError = dynamic(() => import('@/components/sections/mobile/Error'));

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const isMobile = useIsMobile();

    // Mientras detectamos el dispositivo, mostramos un estado neutro o nada para evitar hidratación incorrecta
    if (isMobile === null) return null;

    if (isMobile) {
        return <MobileError error={error} reset={reset} />;
    }

    return <DesktopError error={error} reset={reset} />;
}
