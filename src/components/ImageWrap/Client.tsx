'use client';
import Image from 'next/image';
import type { MdxImageProps } from '.';
import { useParallax } from './useParallax';
import { motion } from 'framer-motion';

import { cn } from '@/utils';
import { omit } from '@/lib/utils';

/**
 * 客户端渲染的 ImageWrap 组件
 * @param props - 组件的 props
 * @returns 渲染的 ImageWrap 组件
 */
export const ClientImageWrap = (props: MdxImageProps) => {
  const { y } = useParallax();

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
        />
      </motion.div>
    );
  }

  return <Image {...props} />;
};
