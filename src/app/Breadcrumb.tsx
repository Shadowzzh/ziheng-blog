'use client';

import { RouterBreadcrumbs } from '@/components/Breadcrumb';
import { generateNestedPathList, splitPathname } from '@/components/Breadcrumb/utils';
import { cn } from '@/utils';
import { usePathname } from 'next/navigation';

export const LayoutBreadcrumb = () => {
  const pathname = usePathname(); // 获取当前路径
  const pathnameSegments = splitPathname(pathname); // 分割路径
  const nestedPathList = generateNestedPathList(pathnameSegments); // 生成路径列表

  /* 固定首页 */
  nestedPathList.unshift({ href: '/', text: '首页', hidden: true });

  const lastItem = nestedPathList[nestedPathList.length - 1];

  if (lastItem?.hidden) {
    return null;
  }
  return (
    <div
      className={cn('px-4 w-screen h-12 flex items-center', 'border-0 border-b border-border/40')}
    >
      <div
        className={cn(
          'm-auto',
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'flex items-center justify-between flex-1'
        )}
      >
        <RouterBreadcrumbs items={nestedPathList} />
      </div>
    </div>
  );
};
