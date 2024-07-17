import type { NestedRouterOption } from '@/config/routerMapping';

import { usePathname } from 'next/navigation';
import { HOME_NAV } from '@/config/nav';
import { last } from '@/lib/utils';
import { generateNestedPathList, splitPathname } from '@/utils/pathParsing';

/** 根据路径生成面包屑 */
export const useBreadcrumb = () => {
  // 虽然这个 usePathname 只能在客户端使用，但是它在服务端就已经有数据了
  const pathname = usePathname(); // 获取当前路径
  const pathnameSegments = splitPathname(pathname); // 分割路径
  const nestedPathList: NestedRouterOption[] = generateNestedPathList(pathnameSegments); // 生成路径列表

  /* 固定首页 */
  nestedPathList.unshift({ ...HOME_NAV, hidden: true });

  if (last(nestedPathList)?.hidden) return null;

  return nestedPathList;
};
