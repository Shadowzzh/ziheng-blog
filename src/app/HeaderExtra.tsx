'use client';

import { BreadcrumbContainer } from '@/components/Loader/Breadcrumb/Container';
import { useLayoutStore } from '@/stores';

/** 额外的 header 内容 */
export const LayoutHeaderExtra: React.FC = () => {
  const Breadcrumb = useLayoutStore((state) => state.breadcrumb);

  return (
    <>
      {Breadcrumb && (
        <BreadcrumbContainer>
          <Breadcrumb />
        </BreadcrumbContainer>
      )}
    </>
  );
};
