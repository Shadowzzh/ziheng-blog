import { cn } from '@/utils';
import Link from 'next/link';

import LogoSvg from '@/assets/images/logo.svg';

export const Logo = () => {
  return (
    <Link className='flex cursor-pointer items-center justify-center' href={'/'}>
      <LogoSvg
        className={cn('mr-2 size-9 rounded-full', 'dark:text-neutral-800 text-neutral-100')}
      />

      <div className={cn('h-full', 'flex items-center font-bold')}>Zzh's Space</div>
    </Link>
  );
};