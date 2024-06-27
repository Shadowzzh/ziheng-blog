import { cn } from '@/utils';
import Link from 'next/link';

import LogoSvg from '@/assets/images/logo.svg';

export const Logo = () => {
  return (
    <Link
      className={cn('flex cursor-pointer items-center justify-center', 'text-primary')}
      href={'/'}
    >
      <LogoSvg className={cn('mr-2 sm:size-9 size-6 rounded-full')} />

      <div className={cn('h-full', 'flex items-center font-bold', 'sm:text-base text-sm')}>
        Zzh&apos;s Space
      </div>
    </Link>
  );
};
