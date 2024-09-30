'use client';
import type React from 'react';
import { useMedia } from 'react-use';
import { SCREEN_CONFIG } from '@/config/screen';

interface MobileOnlyProps {
  children: React.ReactNode;
}

/** 只在移动端显示 */
export const MobileOnly = (props: MobileOnlyProps) => {
  const { children } = props;

  const isMobile = useMedia(`(max-width: ${SCREEN_CONFIG.MD}px)`);

  if (!isMobile) {
    return null;
  }

  return children;
};
