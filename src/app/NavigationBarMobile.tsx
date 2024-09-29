'use client';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { MdRssFeed } from '@react-icons/all-files/md/MdRssFeed';
import { RiMore2Fill } from '@react-icons/all-files/ri/RiMore2Fill';

import { cn } from '@/utils';
import { navigationItems } from '@/config/nav';
import { ModeToggle } from '@/components/ThemeProvider/ThemeToggle';
import { LinkWrap } from '@/components';
import { Button } from '@/components/ui/button';
import { MobileMenuOverlay } from './NavigationBarMobileAnimation';

interface NavigationBarMobileProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * MobileMenus
 *
 * 注：之前使用纯 CSS :target 伪类实现，因为可以在服务端渲染。
 *    但是点击内 li 的 Link 无法关闭，所以改用 React 实现。
 **/
export const NavigationBarMobile = (props: NavigationBarMobileProps) => {
  const [visible, setVisible] = useState(false);

  const showMenu = () => {
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
  };

  return (
    <>
      {/* menu - mobile */}
      <div className={cn('md:hidden', 'flex items-center justify-center', props.className)}>
        <RiMore2Fill
          className={cn('sm:size-6 size-5 cursor-pointer', 'text-foreground')}
          onClick={showMenu}
        />
      </div>

      {/* mobile - 展开 */}
      {createPortal(
        <>
          {/* 覆盖 overlay */}
          <MobileMenuOverlay
            className={cn(
              'fixed z-50',
              'backdrop-blur',
              'w-screen h-screen',
              'inset-0',
              'dark:bg-black/50 bg-black/20',
              // 解决滚动问题
              'touch-none'
            )}
            key='menu-overlay'
            visible={visible}
            onClick={hideMenu}
          />

          <AnimatePresence>
            {visible && (
              <motion.div
                className={cn(
                  'fixed top-4 right-4 z-50',
                  'text-card-foreground text-base',
                  'max-w-60 w-full',
                  'rounded-md shadow-lg p-6 overflow-hidden',
                  'bg-popover'
                )}
                initial={{ opacity: 0, transform: 'scale(0.9)' }}
                animate={{
                  opacity: 1,
                  transform: 'scale(1)',
                  transition: {
                    ease: [0.075, 0.82, 0.165, 1],
                    duration: 0.7
                  }
                }}
                exit={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                  transition: {
                    ease: [0.075, 0.82, 0.165, 1],
                    duration: 0.7
                  }
                }}
              >
                <div
                  className={cn(
                    'size-5 text-primary',
                    'absolute top-5 right-5 z-20',
                    'cursor-pointer'
                  )}
                >
                  <IoMdClose onClick={hideMenu} />
                </div>

                <motion.ul
                  className={cn('space-y-6')}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  key={'test'}
                  variants={{
                    visible: {
                      transition: {
                        when: 'beforeChildren',
                        staggerChildren: 0.1
                      }
                    },
                    hidden: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {navigationItems.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        visible: {
                          opacity: 1,
                          transform: 'translateX(12px)',
                          transition: {
                            ease: [0.075, 0.82, 0.165, 1],
                            duration: 1
                          }
                        },
                        hidden: {
                          opacity: 0,
                          transform: 'translateX(-12px)',
                          transition: {
                            ease: [0.075, 0.82, 0.165, 1],
                            duration: 1
                          }
                        }
                      }}
                    >
                      <LinkWrap href={item.href} onClick={hideMenu}>
                        {item.text}
                      </LinkWrap>
                    </motion.li>
                  ))}
                </motion.ul>

                <div
                  className={cn(
                    'flex',
                    'mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10'
                  )}
                >
                  <ModeToggle />

                  <Button size={'icon'} variant={'ghost'}>
                    <LinkWrap href='/feed.xml'>
                      <MdRssFeed className='size-5' />
                    </LinkWrap>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
};
