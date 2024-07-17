'use client';

import type { TOCDesktopProps } from '@/components/TOC';

import dynamic from 'next/dynamic';
import { useMedia } from 'react-use';

import { Skeleton } from '@/components/ui/skeleton';
import { SCREEN_CONFIG } from '@/config/screen';

const TOCDesktop = dynamic(
  () => import('@/components/TOC/TOCDesktop').then((mod) => mod.TOCDesktop),
  {
    ssr: false,
    loading: () => (
      <div className='h-24 space-y-2 px-3'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    )
  }
);
/** DesktopOnlyTOC 只在桌面端显示目录 */
export const DesktopOnlyTOC = (props: TOCDesktopProps) => {
  const isDesktop = useMedia(`(min-width: ${SCREEN_CONFIG.LG}px)`);

  if (!isDesktop) {
    return null;
  }

  return <TOCDesktop {...props} />;
};
