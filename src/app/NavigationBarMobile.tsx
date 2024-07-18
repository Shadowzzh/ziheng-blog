'use client';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiMore2Fill } from 'react-icons/ri';

import { cn } from '@/utils';
import { navigationItems } from '@/config/nav';
import { ModeToggle } from '@/components/ThemeProvider/ThemeToggle';
import { LinkWrap } from '@/components';

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
      {visible &&
        createPortal(
          <>
            {/* 覆盖 mark */}
            <div
              className={cn(
                'fixed z-50',
                'backdrop-blur',
                'w-screen h-screen',
                'inset-0',
                'dark:bg-black/50 bg-black/20',
                // 解决滚动问题
                'touch-none'
              )}
              onClick={hideMenu}
            />
            <div
              className={cn(
                'fixed top-4 right-4 z-50',
                'text-card-foreground text-base',
                'max-w-60 w-full',
                'rounded-md shadow-lg p-6 overflow-hidden',
                'bg-popover'
              )}
            >
              <IoMdClose
                className={cn('size-5', 'absolute top-6 right-6 text-primary', 'cursor-pointer')}
                onClick={hideMenu}
              />

              <ul className={cn('space-y-6')}>
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <LinkWrap href={item.href} onClick={hideMenu}>
                      {item.text}
                    </LinkWrap>
                  </li>
                ))}
              </ul>

              <div className={cn('mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10')}>
                <ModeToggle />
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};
