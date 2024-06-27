'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { LinkWrap } from '@/components/LinkWrap';
import { usePathname } from 'next/navigation';
import { generateNestedPathList, splitPathname, titleize } from './utils';
import { RouterBreadcrumbProps } from './type';
import { Fragment } from 'react';
import { cn } from '@/utils';

/**
 * 路由面包屑组件
 */
export const RouterBreadcrumbs = (props: RouterBreadcrumbProps) => {
  const { generateBreadcrumbText = titleize } = props;

  const pathname = usePathname();
  const pathnameSegments = splitPathname(pathname);
  const nestedPathList = generateNestedPathList(pathnameSegments);

  /* 固定首页 */
  nestedPathList.unshift({ href: '/', text: '首页' });

  return (
    <Breadcrumb>
      <BreadcrumbList className={cn(' flex-nowrap')}>
        {nestedPathList.map((item, index) => {
          const isLast = index === nestedPathList.length - 1;

          // 生成面包屑文本 (根据路由或自定义)
          const text = generateBreadcrumbText?.(item.href) ?? item.text;

          return (
            <Fragment key={item.href}>
              {/* 分隔符 */}
              {index !== 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem className={cn('min-w-0')}>
                {isLast ? (
                  // 最后一项不可点击
                  <BreadcrumbPage className={cn('block truncate text-primary')}>
                    {text}
                  </BreadcrumbPage>
                ) : (
                  // 其他项可点击跳转
                  <BreadcrumbLink className={cn(' whitespace-nowrap')} asChild>
                    <LinkWrap className={cn('')} href={item.href}>
                      {text}
                    </LinkWrap>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
