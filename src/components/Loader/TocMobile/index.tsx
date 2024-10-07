'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import MenuV4 from '@/assets/lotties/menu-v4.json';

import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { LottieWrap } from '@/components/LottieWrap';

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

/** 显示隐藏 TOC */
export const ToggleToc = () => {
  const [show, setShow] = useState(false);
  const layoutStoreActions = useLayoutStore((state) => state.actions);

  /** 显示隐藏 TOC */
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
        'text-muted-foreground',
        'block lg:hidden',
        'cursor-pointer',
        'flex items-center justify-center'
      )}
    >
      <LottieWrap
        aria-label='显示 / 隐藏目录'
        className='md:size-7 size-6'
        mode='click'
        loop={false}
        animationData={MenuV4}
        onClick={onToggle}
      />
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
