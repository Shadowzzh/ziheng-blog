'use client';

import { useTheme } from 'next-themes';
import { RiMoonFoggyLine } from '@react-icons/all-files/ri/RiMoonFoggyLine';
import { RiSunFoggyLine } from '@react-icons/all-files/ri/RiSunFoggyLine';

import { Button } from '../ui/button';
import { cn } from '@/utils';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle(props: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <div className={cn('relative', 'group', 'md:hover:animate-pulse', props.className)}>
      <Button
        aria-label='toggle theme'
        className={cn('visible dark:invisible')}
        size={'icon'}
        variant={'ghost'}
        onClick={() => setTheme('dark')}
      >
        <RiSunFoggyLine
          className={cn(
            'size-5 ',
            'transition-all duration-700 ease-in-out',
            'scale-100 group-hover:scale-110'
          )}
        />
      </Button>
      <Button
        aria-label='toggle theme'
        className={cn('invisible dark:visible', 'absolute top-0 left-0')}
        size={'icon'}
        variant={'ghost'}
        onClick={() => setTheme('light')}
      >
        <RiMoonFoggyLine
          className={cn(
            'size-5',
            'transition-all duration-700 ease-in-out',
            'scale-100 group-hover:scale-110'
          )}
        />
      </Button>
    </div>
  );
}
