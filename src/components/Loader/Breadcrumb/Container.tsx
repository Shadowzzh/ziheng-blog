import type { ReactNode } from 'react';
import { cn } from '@/utils';

export const BreadcrumbContainer = (props: { children: ReactNode }) => {
  return (
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
          'm-auto flex-auto'
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
