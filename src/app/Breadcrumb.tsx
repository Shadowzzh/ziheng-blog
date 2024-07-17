'use client';

import type { NestedRouterOption } from '@/config/routerMapping';

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { LinkWrap } from '@/components';
import { generateNestedPathList, splitPathname } from '@/utils/pathParsing';

export interface LayoutBreadcrumbProps {
  className?: string;
  routerMapping: Map<string, NestedRouterOption>;
}

export const LayoutBreadcrumb = (props: LayoutBreadcrumbProps) => {
  const { className, routerMapping } = props;

  /**
   *  根据路由名称获取标题
   * @param pathname 路由路径
   * @returns 标题化后的字符串
   */
  const titleize = (pathname: string) => {
    return routerMapping.get(pathname)?.text ?? pathname;
  };

  const pathname = usePathname(); // 获取当前路径
  const pathnameSegments = splitPathname(pathname); // 分割路径
  const nestedPathList: NestedRouterOption[] = generateNestedPathList(pathnameSegments); // 生成路径列表

  /* 固定首页 */
  nestedPathList.unshift({ href: '/', text: '首页' });

  return (
    <div className={cn('flex items-center justify-start flex-1', 'overflow-hidden', className)}>
      <Breadcrumb className={cn('overflow-hidden')}>
        <BreadcrumbList className={cn('flex-nowrap overflow-hidden')}>
          {nestedPathList.map((item, index) => {
            const isLast = index === nestedPathList.length - 1;

            // 生成面包屑文本 (根据路由或自定义)
            const text = titleize(item.href) ?? item.text;

            return (
              <React.Fragment key={item.href}>
                {/* 分隔符 */}
                {index !== 0 && <BreadcrumbSeparator />}

                {isLast ? (
                  // 最后一项不可点击
                  <BreadcrumbItem className={cn(' truncate')}>
                    <BreadcrumbPage className={cn(' truncate')}>{text}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem className={cn('flex-shrink-0')}>
                    {/* 其他项可点击跳转 */}
                    <BreadcrumbLink className={cn('whitespace-nowrap')} asChild>
                      <LinkWrap className={cn('')} href={item.href}>
                        {text}
                      </LinkWrap>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
