"use client";

import React from 'react';
import FloatingActionUI from './UI';
import { useDesktopScroll } from '@/components/providers/DesktopScrollProvider';

interface DesktopFloatingActionProps {
    className?: string;
    fabContent?: any;
    contactInfo?: any;
}

const DesktopFloatingAction: React.FC<DesktopFloatingActionProps> = (props) => {
    const { activeIndex } = useDesktopScroll();

    return (
        <FloatingActionUI
            {...props}
            activeIndex={activeIndex}
            isMobile={false}
        />
    );
};

export default DesktopFloatingAction;
