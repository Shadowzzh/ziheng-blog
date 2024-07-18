'use client';

import type { ComponentProps } from 'react';

import { startTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const isTargetBlank = props.target === '_blank';

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果是新标签页打开链接直接返回
    if (isTargetBlank) return;

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
    <Link
      className={cn('items-center', isTargetBlank && 'inline-flex', props.className)}
      href={href}
      onClick={onClickLink}
      {...rest}
    >
      {children}
    </Link>
  );
}
