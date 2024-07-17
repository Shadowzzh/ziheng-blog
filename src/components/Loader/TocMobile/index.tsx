'use client';

import dynamic from 'next/dynamic';
import { IoCloseSharp } from 'react-icons/io5';

import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { Skeleton } from '@/components/ui/skeleton';

const MobileOnlyTOC = dynamic(() => import('@/components/TOC').then((mod) => mod.MobileOnlyTOC), {
  ssr: false,
  loading: () => (
    <div className='h-24 space-y-2 px-3'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
    </div>
  )
});

export const ToggleToc = () => {
  const [show, setShow] = useState(false);
  const layoutStoreActions = useLayoutStore((state) => state.actions);

  const onToggle = () => {
    if (show) {
      setShow(false);
      layoutStoreActions.resetTocMobile();
    } else {
      setShow(true);
      layoutStoreActions.setTocMobile(<MobileOnlyTOC />);
    }
  };

  useEffect(() => {
    return () => {
      layoutStoreActions.resetTocMobile();
    };
  }, [layoutStoreActions]);

  return (
    <div
      className={cn(
        'size-6 text-muted-foreground mr-3',
        'block sm:hidden',
        'cursor-pointer',
        'flex items-center justify-center'
      )}
    >
      {show ? (
        <IoCloseSharp aria-label='隐藏目录' onClick={onToggle} />
      ) : (
        <CgMenuLeft aria-label='显示目录' onClick={onToggle} />
      )}
    </div>
  );
};

/** 加载手机端页面内容大纲 */
export const LoaderMobileToc = () => {
  const layoutStoreActions = useLayoutStore((state) => state.actions);

  useEffect(() => {
    layoutStoreActions.setTocMobileToggle(<ToggleToc />);

    return () => {
      layoutStoreActions.resetTocMobileToggle();
    };
  }, [layoutStoreActions]);

  return null;
};
