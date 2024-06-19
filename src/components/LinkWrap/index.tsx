'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useProgressBar } from '../ProgressBar';
import { ComponentProps, startTransition } from 'react';

/**
 * Link 基础上增加了一些功能
 **/
export function LinkWrap(props: ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;

  const progress = useProgressBar();
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        startTransition(() => {
          router.push(href.toString());
          progress.done();
        });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
