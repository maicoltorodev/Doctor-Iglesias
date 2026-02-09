"use client";

import React from 'react';
import FloatingActionUI from './UI';
import { useMobileScroll } from '@/components/layout/MobileLayout';

interface MobileFloatingActionProps {
    className?: string;
    fabContent?: any;
    contactInfo?: any;
}

const MobileFloatingAction: React.FC<MobileFloatingActionProps> = (props) => {
    const { activeIndex } = useMobileScroll();

    return (
        <FloatingActionUI
            {...props}
            activeIndex={activeIndex}
            isMobile={true}
        />
    );
};

export default MobileFloatingAction;
