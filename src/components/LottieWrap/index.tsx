'use client';
import type { ComponentProps } from 'react';
import type Lottie from 'lottie-react';

import { useLottie } from 'lottie-react';

import { cn } from '@/utils';

interface LottieWrapProps extends ComponentProps<typeof Lottie> {
  mode: 'hover' | 'click';
}

export const LottieWrap = (props: LottieWrapProps) => {
  const { animationData, mode } = props;
  const { View, play, stop, setDirection } = useLottie({
    animationData,
    autoplay: false
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

  const onClick = () => {
    if (mode !== 'click') return;
    play();
    setDirection(1);
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
