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

  const isDark = theme === 'dark';

  return (
    <div className={cn(props.className)}>
      <Button size={'icon'} variant={'ghost'} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
        <div className={cn()}>
          <GiEvilMoon className={cn({ hidden: isDark }, 'size-6')} />
          <GiStripedSun className={cn({ hidden: !isDark }, 'size-6')} />
        </div>
      </Button>
    </div>
  );
}
