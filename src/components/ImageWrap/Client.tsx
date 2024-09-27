'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';

import { useParallax } from './useParallax';
import { motion } from 'framer-motion';

import { cn } from '@/utils';
import { omit } from '@/lib/utils';
import { useTheme } from 'next-themes';

export interface ClientImageWrapProps extends ImageProps {
  /** 暗黑模式图片 */
  srcDark?: string;
  /** 是否使用视差效果 */
  parallax?: boolean;
}

/**
 * 客户端渲染的 ImageWrap 组件
 * @param props - 组件的 props
 * @returns 渲染的 ImageWrap 组件
 */
export const ClientImageWrap = (props: ClientImageWrapProps) => {
  const { srcDark } = props;

  const { y } = useParallax();
  const { theme } = useTheme();

  const src = (() => {
    // 如果设置了暗黑模式图片，则根据主题返回对应的图片
    if (srcDark) {
      return theme === 'dark' ? srcDark : props.src;
    }
    return props.src;
  })();

  // 如果设置了 parallax，则使用 parallax 效果
  if (props.parallax) {
    const params = omit(props, ['height', 'width', 'parallax', 'className']);

    return (
      <motion.div className={cn('relative', props.className)}>
        <Image
          style={{
            transform: `translateY(${y}px)`
          }}
          className={cn(
            'object-cover !h-auto',
            // '!top-[-50%]',
            'transition-transform duration-75 ease-linear'
          )}
          fill
          {...params}
          src={src}
        />
      </motion.div>
    );
  }

  return <Image {...omit(props, ['parallax', 'srcDark'])} src={src} />;
};
