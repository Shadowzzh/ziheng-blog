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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
          placeholder='blur'
          blurDataURL={blurDataURL}
          {...props}
          className={cn('rounded-md cursor-pointer', props.className)}
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
        <Image className='object-contain' src={props.src} fill alt={props.alt} sizes='100vw' />

        {/* 提示信息 */}
        <Popover>
          <PopoverTrigger
            asChild
            className={cn('absolute top-4 right-4', 'text-neutral-300', 'size-6 cursor-pointer')}
          >
            <Button variant='link' size='icon' onClick={(e) => e.stopPropagation()}>
              <IoInformationCircleOutline className='size-4' />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className='p-3 text-sm bg-background text-foreground'
            collisionPadding={10}
            sticky='always'
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              按下空格键或者点击任意位置
              <br />
              可以快速关闭弹窗
            </p>
          </PopoverContent>
        </Popover>

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
