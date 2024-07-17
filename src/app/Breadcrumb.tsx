'use client';

import type { NestedRouterOption } from '@/config/routerMapping';

import React from 'react';
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
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export interface LayoutBreadcrumbProps {
  className?: string;
  routerMapping: Map<string, NestedRouterOption>;
}

export const LayoutBreadcrumb = (props: LayoutBreadcrumbProps) => {
  const { className, routerMapping } = props;

  const nestedPathList = useBreadcrumb();

  /**
   *  根据路由名称获取标题
   * @param pathname 路由路径
   * @returns 标题化后的字符串
   */
  const titleize = (pathname: string) => {
    return routerMapping.get(pathname)?.text ?? pathname;
  };

  if (!nestedPathList) return null;

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
      </div>
    </div>
  );
};
