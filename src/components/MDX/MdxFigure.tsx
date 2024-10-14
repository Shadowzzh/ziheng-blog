'use client';

import React from 'react';

import { cn, copyText } from '@/utils';
import { Button } from '@/components/ui/button';
import lottiesCheckmark from '@/assets/lotties/checkmark.json';
import lottiesCopy from '@/assets/lotties/copy.json';
import { LottieWrap } from '@/components/LottieWrap';
import { AnimatePresence, motion } from 'framer-motion';

interface MdxFigureProps extends React.HTMLProps<HTMLPreElement> {}

/** 代替 MDX 中的代码片段 */
export const MdxFigure = (props: MdxFigureProps) => {
  const { children, ...args } = props;

  const [copied, setCopied] = React.useState(false);

  const preDom = React.useRef<HTMLPreElement>(null);
  const buttonDom = React.useRef<HTMLButtonElement>(null);

  const timer = React.useRef<NodeJS.Timeout | undefined>();

  /** 复制到剪贴板 */
  const copyToClipboard = async () => {
    clearTimeout(timer.current);
    if (!preDom.current) return;

    const text = preDom.current.innerText;
    await copyText(text.split('\n\n').join('\n'));

    setCopied(true);

    timer.current = setTimeout(() => {
      timer.current = undefined;
      setCopied(false);
      buttonDom.current?.blur();
    }, 1500);
  };

  return (
    <div className={cn('relative group/container')}>
      <Button
        id='text-button'
        ref={buttonDom}
        aria-label='code to clipboard'
        className={cn(
          'absolute sm:right-3 sm:top-[0.6rem] right-1 top-1',
          'group',
          'sm:size-7 size-6',
          'p-0 flex items-center justify-center',
          'rounded-sm',
          'duration-300 ease-in-out transition-all',
          'dark:hover:text-slate-400 dark:text-slate-500',
          'hover:text-slate-400 text-slate-500',
          'active/container:scale-110 scale-100 duration-300 ease-in-out'
        )}
        variant='link'
        onClick={copyToClipboard}
      >
        <AnimatePresence mode='popLayout'>
          {copied ? (
            <motion.div
              key='copied'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
            >
              <LottieWrap
                className='md:size-5 size-4 animate-fade-in-300'
                animationData={lottiesCheckmark}
                speed={2}
                loop={false}
              />
            </motion.div>
          ) : (
            <motion.div
              key='copy'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
            >
              <LottieWrap
                className='md:size-5 size-4'
                animationData={lottiesCopy}
                mode='hover'
                loop={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <figure {...args} ref={preDom}>
        {children}
      </figure>
    </div>
  );
};
