import { allPosts } from 'contentlayer/generated';
import { navigationItems } from './nav';

export interface RouterOption {
  href: string;
  text: string;
}

/** 博客页面的路由 */
const postsRoutes: RouterOption[] = allPosts.map((post) => {
  return {
    href: `${post.slug}`,
    text: post.title
  };
});

/** 路由配置：导航路由 + 博客页面路由 */
export const routerConfig = [...navigationItems, ...postsRoutes];

export const routerMapping = new Map(routerConfig.map((item) => [item.href, item]));
