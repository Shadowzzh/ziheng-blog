'use client';

import type { ReactNode } from 'react';

import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import { CgMenuLeft } from 'react-icons/cg';

/** 额外的 header 内容 */
export const LayoutHeaderExtra: React.FC<{ Breadcrumb: ReactNode }> = (props) => {
  const { Breadcrumb } = props;

  const TocMobileToggle = useLayoutStore((state) => state.TocMobileToggle);
  const TocMobile = useLayoutStore((state) => state.TocMobile);

  return (
    <>
      {/* 面包屑 */}
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
            '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
            'm-auto flex-auto',
            'flex items-center'
          )}
        >
          <div className='block sm:hidden'>
            {TocMobileToggle === null ? (
              <CgMenuLeft
                aria-label='显示/隐藏目录'
                className={cn(
                  'opacity-20',
                  'size-5 text-muted-foreground mr-3',
                  'block sm:hidden',
                  'cursor-not-allowed'
                )}
              />
            ) : (
              TocMobileToggle
            )}
          </div>
          {Breadcrumb}
        </div>
      </div>

      {/* 目录 */}
      {TocMobile && (
        <div className={cn('w-screen', 'sm:px-8 pl-4', 'shadow-sm dark:shadow-md')}>
          <div
            className={cn(
              '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
              'm-auto flex-auto pr-4',
              'max-h-[30vh] py-3',
              'overflow-y-auto overflow-x-hidden'
            )}
          >
            {TocMobile}
          </div>
        </div>
      )}
    </>
  );
};
