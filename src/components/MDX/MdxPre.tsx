'use client';

import React from 'react';
import { TbCopy, TbCopyCheck } from 'react-icons/tb';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';

interface MdxLinkProps extends React.HTMLProps<HTMLPreElement> {}

let timer: NodeJS.Timeout | undefined;

/** 代替 MDX 中的代码片段 */
export const MdxPre = (props: MdxLinkProps) => {
  const { children, ...args } = props;

  const [copied, setCopied] = React.useState(false);

  const preRef = React.useRef<HTMLPreElement>(null);

  /** 复制到剪贴板 */
  const copyToClipboard = () => {
    clearTimeout(timer);
    if (!preRef.current) return;

    const text = preRef.current.innerText;
    navigator.clipboard.writeText(text);

    setCopied(true);

    timer = setTimeout(() => {
      timer = undefined;
      setCopied(false);
    }, 1500);
  };

  return (
    <div className={cn('relative group/container')}>
      <Button
        className={cn(
          'group',
          'absolute right-3 top-3',
          'size-7',
          'p-0 flex items-center justify-center',
          'rounded-sm',
          'group-hover/container:inline-flex hidden',
          'hover:text-primary text-muted-foreground',
          'active/container:scale-110 scale-100'
        )}
        // size={'sm'}
        variant={'ghost'}
        onClick={copyToClipboard}
      >
        {copied ? <TbCopyCheck className='size-4' /> : <TbCopy className='size-4' />}
      </Button>

      <pre {...args} ref={preRef}>
        {children}
      </pre>
    </div>
  );
};
