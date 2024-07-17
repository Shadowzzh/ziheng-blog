/**
 *  分割路径名称
 * @param pathname 路径名称
 * @returns 分割后的路径名称
 */
export const splitPathname = (pathname?: string): string[] => {
  if (!pathname) return [];
  const pathnameSegments = pathname.split(/\//).filter((v) => v);
  return pathnameSegments;
};

/**
 * 根据路径名称生成嵌套的路径列表
 * @param pathnameSegments 已分割的路径名称
 * @returns 嵌套的路径列表
 * @example generateNestedPathList(['a', 'b', 'c']) => [{ href: '/a', text: 'a' }, { href: '/a/b', text: 'b' }, { href: '/a/b/c', text: 'c' }]
 */
export const generateNestedPathList = (
  pathnameSegments: string[]
): { href: string; text: string }[] => {
  if (Array.isArray(pathnameSegments) === false || !pathnameSegments.length) return [];

  const nested = pathnameSegments.map((segment, index) => {
    const href = `/${pathnameSegments.slice(0, index + 1).join('/')}`;

    return { href, text: segment };
  });

  return nested;
};
