"use client";

import React from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import CustomCursor from './desktop/CustomCursor';

export const ServiceCursor = () => {
    const cursorState = useCustomCursor();
    return <CustomCursor cursorState={cursorState} />;
};
