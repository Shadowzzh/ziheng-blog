import { NestedRouterOption, routerMapping } from '@/config/routerMapping';

/**
 *  分割路径名称
 * @param pathname 路径名称
 * @returns 分割后的路径名称
 */
export const splitPathname = (pathname: string) => {
  const pathnameSegments = pathname.split(/\//).filter((v) => v);
  return pathnameSegments;
};

/**
 * 生成嵌套的路径列表
 * @param pathnameSegments 已分割的路径名称
 * @returns 嵌套的路径列表
 */
export const generateNestedPathList = (pathnameSegments: string[]) => {
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
