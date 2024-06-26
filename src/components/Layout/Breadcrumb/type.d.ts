export interface RouterBreadcrumbProps {
  className?: string;
  generateBreadcrumbText?: (pathname: string) => string | void;
}

export interface NestedRouterOption {
  href: string;
  text: string;
}
