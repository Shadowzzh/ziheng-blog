'use client';

import { BEZIER } from '@/config/animation';
import { useLayoutStore } from '@/stores';
import { cn } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';

/** 额外的 header 内容 */
export const LayoutHeaderToc = () => {
  const TocMobile = useLayoutStore((state) => state.TocMobile);

  return (
    // 目录
    <AnimatePresence>
      {/* 背景 */}
      {TocMobile && (
        <motion.div
          className={cn(
            'fixed top-[6rem] left-0',
            'backdrop-blur bg-background/80 z-10',
            'max-h-[30vh] h-auto  w-screen ',
            'overflow-y-auto overflow-x-hidden',
            'origin-top-left',
            'shadow',
            'p-3'
          )}
          initial='exit'
          animate='visible'
          exit='exit'
          variants={{
            visible: {
              opacity: 1,
              transform: 'scale(1)',
              transition: {
                ease: BEZIER.OUT_EXPO,
                duration: 0.5,
                delayChildren: 0.1
              }
            },
            exit: {
              opacity: 0,
              transform: 'scale(0.7)',
              transition: { ease: BEZIER.OUT_EXPO, duration: 0.5 }
            }
          }}
        >
          <motion.div
            className={cn('h-full w-screen', 'overflow-y-auto overflow-x-hidden')}
            variants={{
              visible: {
                opacity: 1,
                transition: { ease: BEZIER.OUT_QUART, duration: 0.3 }
              },
              exit: {
                opacity: 0,
                transition: { ease: BEZIER.OUT_QUART, duration: 0.3 }
              }
            }}
          >
            {TocMobile}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
