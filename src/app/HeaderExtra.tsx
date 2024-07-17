'use client';

import { useLayoutStore } from '@/stores/layout';
import { cn } from '@/utils';

export const LayoutHeaderExtra: React.FC<{ className?: string }> = (props) => {
  const { className } = props;

  const headerExtraContent = useLayoutStore((state) => state.headerExtraContent);

  return (
    headerExtraContent && (
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'sm:px-8 px-4 py-3',
          'm-auto',
          'transition-all ease-in-out duration-300',
          'shadow-sm',
          className
        )}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        {headerExtraContent}
      </div>
    )
  );
};
