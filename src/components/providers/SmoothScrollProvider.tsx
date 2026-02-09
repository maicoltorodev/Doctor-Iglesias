"use client";

import React from 'react';

/**
 * SMOOTH SCROLL PROVIDER - DESHABILITADO
 * 
 * ESTADO: DESCONTINUADO - El proyecto usa scroll horizontal nativo directamente en DesktopLayout
 * 
 * MOTIVO DE ELIMINACIÓN: 
 * - Lenis ya no se usa (comentado en useEffect línea 11-14)
 * - Este archivo solo agrega bundle size sin beneficio funcional
 * - DesktopLayout maneja el scroll directamente con CSS snap
 * 
 * ALTERNATIVA: Si se necesita scroll suave en el futuro,
 * implementar directamente en DesktopLayout sin provider separado
 */
export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};
