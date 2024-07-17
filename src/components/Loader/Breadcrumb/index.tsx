'use client';

import { LayoutBreadcrumb, type LayoutBreadcrumbProps } from '@/app/Breadcrumb';
import { useLayoutStore } from '@/stores';
import { useEffect } from 'react';

/** 加载面包屑 */
export const LoaderBreadcrumb = (props: LayoutBreadcrumbProps) => {
  const layoutStoreActions = useLayoutStore((state) => state.actions);

  useEffect(() => {
    layoutStoreActions.setBreadcrumb((args) => <LayoutBreadcrumb {...args} {...props} />);

    return () => {
      layoutStoreActions.resetBreadcrumb();
    };
  }, [layoutStoreActions, props]);

  return null;
};
