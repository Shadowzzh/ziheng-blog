import { NestedRouterOption } from './type';

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
