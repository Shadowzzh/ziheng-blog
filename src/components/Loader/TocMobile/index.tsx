'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp';
import { CgMenuLeft } from '@react-icons/all-files/cg/CgMenuLeft';

import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
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
        'text-muted-foreground mr-3',
        'block lg:hidden',
        'cursor-pointer',
        'flex items-center justify-center'
      )}
    >
      {show ? (
        <IoCloseSharp className='md:size-5 size-4 ' aria-label='隐藏目录' onClick={onToggle} />
      ) : (
        <CgMenuLeft className='md:size-5 size-4 ' aria-label='显示目录' onClick={onToggle} />
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
