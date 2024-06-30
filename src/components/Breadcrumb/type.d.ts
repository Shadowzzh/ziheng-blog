import { NestedRouterOption } from '@/config/routerMapping';

export interface RouterBreadcrumbProps {
  className?: string;
  generateBreadcrumbText?: (pathname: string) => string | void;
  items: NestedRouterOption[];
}
