import type { NestedRouterOption } from './routerMapping';

export const HOME_NAV = { href: '/', text: '首页' };
export const navigationItems: NestedRouterOption[] = [
  HOME_NAV,
  { href: '/posts', text: '文章' },
  process.env.NODE_ENV === 'development' ? { href: '/gallery', text: '相册' } : null,
  { href: '/about', text: '关于' }
].filter(Boolean) as NestedRouterOption[];
