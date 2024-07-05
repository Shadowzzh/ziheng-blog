'use client';

import { useTheme } from 'next-themes';
import { GiEvilMoon, GiStripedSun } from 'react-icons/gi';
import { Button } from '../ui/button';
import { cn } from '@/utils';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle(props: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  const isDark = theme !== 'light'; // !== 'light' 保证了默认是 dark

  return (
    <div className={cn(props.className)}>
      <Button size={'icon'} variant={'ghost'} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
        <div className={cn()}>
          {isDark ? <GiEvilMoon className={'size-6'} /> : <GiStripedSun className={'size-6'} />}
        </div>
      </Button>
    </div>
  );
}
