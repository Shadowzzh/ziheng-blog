import { allPosts } from 'contentlayer/generated';
import { navigationItems } from './nav';

/** 嵌套路由选项 */
export interface NestedRouterOption {
  /** 路由路径 */
  href: string;
  /** 显示文本 */
  text: string;
  /** 是否隐藏 */
  hidden?: boolean;
}

/** 博客页面的路由 */
const postsRoutes: NestedRouterOption[] = allPosts.map((post) => {
  return {
    href: `${post.slug}`,
    text: post.title
  };
});

/** 路由配置：导航路由 + 博客页面路由 */
export const routerConfig = [...navigationItems, ...postsRoutes];

export const routerMapping = new Map(routerConfig.map((item) => [item.href, item]));
