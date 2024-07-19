import type { ComponentProps } from 'react';

import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { NavigationBar } from '@/app/NavigationBar';
import { NavigationBarMobile } from '@/app/NavigationBarMobile';

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
        <NavigationBarMobile />
      </div>
    </header>
  );
};
