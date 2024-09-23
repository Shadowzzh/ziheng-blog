'use client';

import { useEffect, useRef, useState } from 'react';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { IoInformationCircleOutline } from '@react-icons/all-files/io5/IoInformationCircleOutline';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';

interface PreviewImageProps extends ImageProps {
  blurDataURL?: string;
}

/** 图片预览组件 */
export const PreviewImage = (props: PreviewImageProps) => {
  const { blurDataURL } = props;

  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          className={'rounded-md cursor-pointer'}
          placeholder='blur'
          blurDataURL={blurDataURL}
          {...props}
        />
      </DialogTrigger>

      <VisuallyHidden.Root>
        <DialogTitle asChild>
          <span>图片预览</span>
        </DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent
        ref={contentRef}
        onClick={() => setOpen(false)}
        showClose={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className={cn(
          'w-screen max-w-[100vw] h-screen',
          'p-0 bg-transparent border-none rounded-none'
        )}
      >
        <Image className='object-contain py-20' src={props.src} fill alt={props.alt} />

        {/* 提示信息 */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              asChild
              className={cn('absolute top-4 right-4', 'text-neutral-300', 'size-6 cursor-pointer')}
            >
              <Button variant='link' size='icon'>
                <IoInformationCircleOutline className='size-4' />
              </Button>
            </TooltipTrigger>

            <TooltipPortal container={contentRef.current}>
              <TooltipContent collisionPadding={10} sticky='always'>
                <p>
                  按下空格键或者点击任意位置
                  <br />
                  可以快速关闭弹窗
                </p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>

        {/* 隐藏信息 */}
        <VisuallyHidden.Root>
          <DialogDescription aria-describedby='图片预览'>
            按下空格键可以快速关闭弹窗
          </DialogDescription>
        </VisuallyHidden.Root>
      </DialogContent>
    </Dialog>
  );
};
