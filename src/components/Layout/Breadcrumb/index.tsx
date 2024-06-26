'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { LinkWrap } from '@/components/LinkWrap';
import { usePathname } from 'next/navigation';
import { generateNestedPathList, splitPathname } from './utils';
import { RouterBreadcrumbProps } from './type';
import { Fragment } from 'react';

/**
 * 路由面包屑组件
 */
export const RouterBreadcrumbs = (props: RouterBreadcrumbProps) => {
  const { generateBreadcrumbText } = props;

  const pathname = usePathname();
  const pathnameSegments = splitPathname(pathname);
  const nestedPathList = generateNestedPathList(pathnameSegments);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* 固定首页 */}
        <BreadcrumbItem>
          <LinkWrap href='/'>首页</LinkWrap>
        </BreadcrumbItem>

        {nestedPathList.map((item, index) => {
          const isLast = index === nestedPathList.length - 1;

          // 生成面包屑文本(路由｜自定义)
          const text = generateBreadcrumbText?.(item.href) ?? item.text;
          // 最后一项不可点击
          const Content = isLast ? text : <LinkWrap href={item.href}>{text}</LinkWrap>;

          return (
            <Fragment key={item.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{Content}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
