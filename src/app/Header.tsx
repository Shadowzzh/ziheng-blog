import type { ComponentProps } from 'react';
import dynamic from 'next/dynamic';

import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { NavigationBar } from '@/app/NavigationBar';
import { Skeleton } from '@/components/ui/skeleton';

const LoaderNavigationBarMobile = dynamic(
  () => import('@/app/NavigationBarMobile').then((mod) => mod.NavigationBarMobile),
  {
    ssr: false,
    loading: () => <Skeleton className='w-3 h-4  rounded-sm' />
  }
);

/** Layout Header */
export const LayoutHeader = (props: ComponentProps<'header'>) => {
  return (
    <header
      id='layout-header'
      className={cn('sm:border-b border-border/40', 'sm:px-8 px-4', props.className)}
    >
      <div
        className={cn(
          'lg:max-w-5xl',
          'm-auto',
          'sm:border-b border-border/40',
          'h-full',
          'flex items-center justify-between',
          'sm:border-0 border-b border-border/40'
        )}
      >
        <div>
          <Logo />
        </div>

        <NavigationBar />
        <LoaderNavigationBarMobile />
      </div>
    </header>
  );
};
