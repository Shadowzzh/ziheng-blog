import { allPosts } from 'contentlayer/generated';
import { navigationItems } from './nav';

/** 嵌套路由选项 */
export interface NestedRouterOption {
  href: string;
  text: string;
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
