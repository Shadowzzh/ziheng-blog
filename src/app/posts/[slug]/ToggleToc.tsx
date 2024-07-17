import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import React from 'react';
import { CgMenuLeft } from 'react-icons/cg';

/** 移动端的页面内容大纲组件 */
const TOCWithout = dynamic(() => import('@/components/TOC').then((m) => m.MobileOnlyTOC), {
  ssr: false
});

/** 切换 TOC 显示状态 */
export const ToggleTOC = () => {
  const [show, setShow] = React.useState(false);
  const layoutActions = useLayoutStore((state) => state.actions);

  const onToggle = () => {
    if (show) {
      setShow(false);
      layoutActions.setHeaderExtraContent(null);
    } else {
      setShow(true);
      layoutActions.setHeaderExtraContent(<TOCWithout className={cn('block sm:hidden')} />);
    }
  };

  return (
    <div className={cn('block sm:hidden')}>
      <CgMenuLeft
        className={cn('size-5 text-muted-foreground mr-2', 'block sm:hidden')}
        onClick={onToggle}
      />
    </div>
  );
};
