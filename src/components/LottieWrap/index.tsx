'use client';
import type { HTMLProps } from 'react';
import { useState, type ComponentProps } from 'react';
import type Lottie from 'lottie-react';

import { useLottie } from 'lottie-react';

import { cn } from '@/utils';

interface LottieWrapProps extends ComponentProps<typeof Lottie>, HTMLProps<HTMLDivElement> {
  mode: 'hover' | 'click';
  loop?: boolean;
}

export const LottieWrap = (props: LottieWrapProps) => {
  const { animationData, mode, loop = true } = props;

  const [state, setState] = useState<'start' | 'end'>('end');

  const { View, play, stop, setDirection } = useLottie({
    animationData,
    autoplay: false,
    loop
  });

  const onMouseEnter = () => {
    if (mode !== 'hover') return;
    setDirection(1);
    play();
  };

  const onMouseLeave = () => {
    if (mode !== 'hover') return;
    setDirection(-1);
    stop();
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(e);
    if (mode !== 'click') return;

    if (state === 'start') {
      setDirection(-1);
      play();
      setState('end');
    } else {
      setDirection(1);
      play();
      setState('start');
    }
  };

  return (
    <div
      className={cn('[&_*]:!stroke-current', '[&_*]:!fill-current', props.className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {View}
    </div>
  );
};
