'use client';

import type { ReactNode } from 'react';

import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

/** 额外的 header 内容 */
export const LayoutHeaderExtra: React.FC<{ Breadcrumb: ReactNode }> = (props) => {
  const { Breadcrumb } = props;

  const TocMobileToggle = useLayoutStore((state) => state.TocMobileToggle);

  const nestedPathList = useBreadcrumb();

  return (
    <>
      {/* 面包屑 */}
      {nestedPathList?.length && (
        <div
          className={cn(
            'w-screen',
            'sm:px-8 px-4 h-12',
            'border-0 border-b border-border/40',
            'flex items-center justify-start'
          )}
        >
          <div
            className={cn(
              'lg:max-w-5xl',
              'm-auto flex-auto',
              'flex items-center',
              'overflow-hidden'
            )}
          >
            {TocMobileToggle && (
              <div className={cn('block lg:hidden', 'p-2 m-[-0.5rem] mr-1')}>{TocMobileToggle}</div>
            )}
            {Breadcrumb}
          </div>
        </div>
      )}
    </>
  );
};
