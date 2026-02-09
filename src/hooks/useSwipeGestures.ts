"use client";

import { useRef, useEffect, useCallback } from 'react';

export interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventScroll?: boolean;
  debounceMs?: number;
}

/**
 * HOOK DE GESTOS TÁCTILES - Swipe gestures para mobile
 * 
 * CARACTERÍSTICAS:
 * - Detección de swipe en 4 direcciones
 * - Configuración de umbral y debounce
 * - Prevención de scroll durante swipe
 * - Performance optimizada con RAF
 */
export const useSwipeGestures = (
  elementRef: React.RefObject<HTMLElement | null>,
  config: SwipeGestureConfig = {}
) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventScroll = false,
    debounceMs = 100
  } = config;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isSwipingRef = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    isSwipingRef.current = false;

    // Prevenir scroll vertical si está configurado
    if (preventScroll) {
      e.preventDefault();
    }
  }, [preventScroll]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Prevenir scroll vertical si estamos en swipe horizontal
    if (preventScroll && Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
    }

    // Marcar que estamos en swipe si superamos umbral mínimo
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      isSwipingRef.current = true;
    }
  }, [preventScroll]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current || !isSwipingRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Limpiar referencia
    touchStartRef.current = null;
    isSwipingRef.current = false;

    // Validar que el swipe sea válido
    if (
      Math.abs(deltaX) < threshold || 
      Math.abs(deltaY) < threshold ||
      deltaTime > 500 // Swipe muy lento
    ) {
      return;
    }

    // Limpiar debounce anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce para evitar múltiples detecciones
    debounceRef.current = setTimeout(() => {
      // Determinar dirección principal del swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe horizontal
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else {
        // Swipe vertical
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }, debounceMs);
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, debounceMs]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Agregar event listeners con opciones pasivas para performance
    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      // Limpiar debounce al desmontar
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll]);
};
