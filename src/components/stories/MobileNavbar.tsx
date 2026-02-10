"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/ui/CtaButton';

interface MobileNavbarProps {
  sectionName: string;
  onMenuClick?: () => void;
  onBookingClick?: () => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  sectionName,
  onMenuClick,
  onBookingClick
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-center h-16">
        <CtaButton 
          onClick={onBookingClick}
          className="px-6 py-2.5 text-[10px] tracking-[0.25em]"
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
