/**
 * 搜索参数
 */
export interface SearchParams {
  viewport: 'mobile' | 'desktop';
}

/**
 * 服务器组件参数
 */
export interface ServerComponentProps {
  searchParams: SearchParams;
}
