'use client';

import { cn } from '@/utils';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import React from 'react';
import { LinkWrap } from '@/components';

import { NestedRouterOption, routerMapping } from '@/config/routerMapping';

/**
 *  分割路径名称
 * @param pathname 路径名称
 * @returns 分割后的路径名称
 */
const splitPathname = (pathname: string) => {
  const pathnameSegments = pathname.split(/\//).filter((v) => v);
  return pathnameSegments;
};

/**
 * 生成嵌套的路径列表
 * @param pathnameSegments 已分割的路径名称
 * @returns 嵌套的路径列表
 */
const generateNestedPathList = (pathnameSegments: string[]) => {
  const nested: NestedRouterOption[] = pathnameSegments.map((segment, index) => {
    const href = `/${pathnameSegments.slice(0, index + 1).join('/')}`;

    return { href, text: segment };
  });

  return nested;
};

/**
 *  根据路由名称获取标题
 * @param pathname 路由路径
 * @returns 标题化后的字符串
 */
export const titleize = (pathname: string) => {
  return routerMapping.get(pathname)?.text ?? pathname;
};

export const LayoutBreadcrumb = (props: { className?: string }) => {
  const { className } = props;

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
        <Breadcrumb className={cn(className)}>
          <BreadcrumbList className={cn(' flex-nowrap')}>
            {nestedPathList.map((item, index) => {
              const isLast = index === nestedPathList.length - 1;

              // 生成面包屑文本 (根据路由或自定义)
              const text = titleize(item.href) ?? item.text;

              return (
                <React.Fragment key={item.href}>
                  {/* 分隔符 */}
                  {index !== 0 && <BreadcrumbSeparator />}

                  <BreadcrumbItem className={cn('min-w-0')}>
                    {isLast ? (
                      // 最后一项不可点击
                      <BreadcrumbPage className={cn('block truncate')}>{text}</BreadcrumbPage>
                    ) : (
                      // 其他项可点击跳转
                      <BreadcrumbLink className={cn(' whitespace-nowrap')} asChild>
                        <LinkWrap className={cn('')} href={item.href}>
                          {text}
                        </LinkWrap>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};