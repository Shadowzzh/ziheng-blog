import type { NestedRouterOption } from './routerMapping';

export const HOME_NAV = { href: '/', text: '首页' };
export const navigationItems: NestedRouterOption[] = [
  HOME_NAV,
  { href: '/posts', text: '文章' }
  // { href: '/photo', text: '相册' },
  // { href: '/about', text: '关于' },
];
