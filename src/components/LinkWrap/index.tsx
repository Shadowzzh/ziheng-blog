'use client';

import type { ComponentProps } from 'react';

import { startTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useProgressBarStore } from '@/app/ProgressBar';

/**
 * Link 基础上增加了一些功能
 **/
export function LinkWrap(props: ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;

  const start = useProgressBarStore((state) => state.start);
  const done = useProgressBarStore((state) => state.done);

  const router = useRouter();

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    start();

    startTransition(() => {
      router.push(href.toString());
      done();
    });
  };

  return (
    <Link href={href} onClick={onClickLink} {...rest}>
      {children}
    </Link>
  );
}
