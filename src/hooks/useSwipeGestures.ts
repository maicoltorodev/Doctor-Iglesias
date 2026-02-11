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
 * - Estabilidad garantizada mediante Refs (evita stale closures)
 * - Prevención de scroll optimizada
 */
export const useSwipeGestures = (
  elementRef: React.RefObject<HTMLElement | null>,
  config: SwipeGestureConfig = {}
) => {
  const {
    threshold = 50,
    preventScroll = false,
    debounceMs = 100
  } = config;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isSwipingRef = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Mantenemos una ref a la config actual para evitar stale closures en los event listeners
  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    isSwipingRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Prevenir scroll si estamos en swipe horizontal
    if (preventScroll && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (e.cancelable) e.preventDefault();
    }

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

    touchStartRef.current = null;
    isSwipingRef.current = false;

    // Validar umbrales
    if ((Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) || deltaTime > 600) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = configRef.current;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe horizontal
        if (deltaX > 0) onSwipeRight?.();
        else onSwipeLeft?.();
      } else {
        // Swipe vertical
        if (deltaY > 0) onSwipeDown?.();
        else onSwipeUp?.();
      }
    }, debounceMs);
  }, [threshold, debounceMs]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Usar pasivo según configuración
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [elementRef, preventScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);
};
