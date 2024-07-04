'use client';

import React from 'react';
import { TbCopy, TbCopyCheck } from 'react-icons/tb';
import { cn, copyText } from '@/utils';
import { Button } from '@/components/ui/button';

interface MdxFigureProps extends React.HTMLProps<HTMLPreElement> {}

/** 代替 MDX 中的代码片段 */
export const MdxFigure = (props: MdxFigureProps) => {
  const { children, ...args } = props;

  const [copied, setCopied] = React.useState(false);

  const preDom = React.useRef<HTMLPreElement>(null);
  const buttonDom = React.useRef<HTMLButtonElement>(null);

  const timer = React.useRef<NodeJS.Timeout | undefined>();

  /** 复制到剪贴板 */
  const copyToClipboard = async () => {
    clearTimeout(timer.current);
    if (!preDom.current) return;

    const text = preDom.current.innerText;
    await copyText(text.split('\n\n').join('\n'));

    setCopied(true);

    timer.current = setTimeout(() => {
      timer.current = undefined;
      setCopied(false);
      buttonDom.current?.blur();
    }, 1500);
  };

  return (
    <div className={cn('relative group/container')}>
      <Button
        id='text-button'
        ref={buttonDom}
        aria-label='code to clipboard'
        className={cn(
          'absolute sm:right-3 sm:top-[0.6rem] right-1 top-1',
          'group',
          'sm:size-7 size-6',
          'p-0 flex items-center justify-center',
          'rounded-sm',
          'duration-300 ease-in-out transition-all',
          'sm:hover:!bg-accent !bg-transparent',
          'hover:opacity-100 opacity-20 ',
          'hover:text-slate-400 text-slate-500',
          'active/container:scale-110 scale-100 duration-300 ease-in-out'
        )}
        // size={'sm'}
        variant={'ghost'}
        onClick={copyToClipboard}
      >
        {copied ? <TbCopyCheck className='size-4' /> : <TbCopy className='size-4' />}
      </Button>

      <figure {...args} ref={preDom}>
        {children}
      </figure>
    </div>
  );
};
