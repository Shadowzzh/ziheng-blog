'use client';

import type { ComponentProps } from 'react';

import { startTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { TbExternalLink } from '@react-icons/all-files/';
import { TbExternalLink } from 'react-icons/tb';
// import { RxExternalLink } from "react-icons/rx";

import { useProgressBarStore } from '@/app/ProgressBar';
import { cn } from '@/utils';

interface LinkWrapProps extends ComponentProps<typeof Link> {
  /** 链接图标的类名 */
  linkIconClassName?: string;
}

/**
 * Link 基础上增加了一些功能
 **/
export function LinkWrap(props: LinkWrapProps) {
  const { children, href, ...rest } = props;

  const start = useProgressBarStore((state) => state.start);
  const done = useProgressBarStore((state) => state.done);

  const router = useRouter();

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果是新标签页打开链接直接返回
    if (props.target === '_blank') return;

    e.preventDefault();

    // 如果是按住了 ctrl 键或者 meta 键点击链接
    if (typeof href === 'string' && (e.metaKey || e.ctrlKey)) {
      // 在新标签页中打开链接
      window.open(href, '_blank');
    }

    start();

    startTransition(() => {
      router.push(href.toString());
      done();
    });
  };

  return (
    <Link className='inline-flex items-center' href={href} onClick={onClickLink} {...rest}>
      {children}
      {props.target === '_blank' && (
        <TbExternalLink className={cn('size-4 ml-1', props.linkIconClassName)} />
      )}
    </Link>
  );
}
