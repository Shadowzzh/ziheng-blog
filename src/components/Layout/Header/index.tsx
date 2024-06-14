import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Layout Header **/
export const Header = (props: HeaderProps) => {
  return (
    <header className={cn('h-16', 'bg-neutral-900')}>
      <div
        className={cn(
          '2xl:max-w-8xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'px-8',
          'h-full',
          'flex items-center justify-between',
          'm-auto',
          ' text-white'
        )}
      >
        <div>
          <Logo />
        </div>

        <div>
          <div
            className={cn(
              '*:ml-6',
              '*:whitespace-nowrap',
              'text-sm',
              'flex flex-nowrap items-center justify-center '
            )}
          >
            <Link href='/'>首页</Link>
            <Link href='/posts'>文章</Link>
            <Link href='/photo'>相册</Link>
            <Link href='/about'>关于</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
