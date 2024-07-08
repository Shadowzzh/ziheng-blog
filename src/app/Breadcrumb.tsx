'use client';
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
import type { NestedRouterOption } from '@/config/routerMapping';

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

export const LayoutBreadcrumb = (props: {
  className?: string;
  icon?: React.ReactNode;
  routerMapping: Map<string, NestedRouterOption>;
}) => {
  const { className, routerMapping, icon } = props;

  /**
   *  根据路由名称获取标题
   * @param pathname 路由路径
   * @returns 标题化后的字符串
   */
  const titleize = (pathname: string) => {
    return routerMapping.get(pathname)?.text ?? pathname;
  };

  // TODOQA <- 这里为什么在服务器端就可以获取到路径呢？
  const pathname = usePathname(); // 获取当前路径
  const pathnameSegments = splitPathname(pathname); // 分割路径
  const nestedPathList = generateNestedPathList(pathnameSegments); // 生成路径列表
  // ->

  /* 固定首页 */
  nestedPathList.unshift({ href: '/', text: '首页', hidden: true });

  const lastItem = nestedPathList[nestedPathList.length - 1];

  // 如果当前路由是最后一项并且隐藏，则不显示面包屑
  if (lastItem?.hidden) return null;

  return (
    <div
      className={cn(
        'px-4 w-screen h-12 flex items-center',
        'border-0 border-b border-border/40',
        'overflow-hidden'
      )}
    >
      <div
        className={cn(
          'm-auto',
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'flex items-center justify-start flex-1',
          'overflow-hidden'
        )}
      >
        {icon}
        <Breadcrumb className={cn(className, 'overflow-hidden')}>
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
  );
};
