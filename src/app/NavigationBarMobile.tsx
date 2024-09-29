'use client';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { MdRssFeed } from '@react-icons/all-files/md/MdRssFeed';
import { RiMore2Fill } from '@react-icons/all-files/ri/RiMore2Fill';

import { cn } from '@/utils';
import { navigationItems } from '@/config/nav';
import { ModeToggle } from '@/components/ThemeProvider/ThemeToggle';
import { LinkWrap } from '@/components';
import { Button } from '@/components/ui/button';
import {
  MobileMenuContent,
  MobileMenuLinkList,
  MobileMenuLinkListItem,
  MobileMenuList,
  MobileMenuListItem,
  MobileMenuOverlay
} from '@/app/NavigationBarMobileAnimation';

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
  console.log('🚀 ~ NavigationBarMobile ~ visible:', visible);

  const showMenu = () => {
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
  };

  return (
    <>
      {/* menu - mobile */}
      {createPortal(
        <div
          className={cn(
            'fixed top-1 right-1',
            'md:hidden',
            'flex items-center justify-center',
            'p-3',
            visible ? 'z-10' : 'z-[11]',
            props.className
          )}
          onClick={showMenu}
        >
          <RiMore2Fill className={cn('sm:size-6 size-5 cursor-pointer', 'text-foreground')} />
        </div>,
        document.body
      )}

      {/* mobile - 展开 */}
      {createPortal(
        <>
          {/* 覆盖 overlay */}
          <MobileMenuOverlay
            className={cn(
              'fixed z-10',
              'backdrop-blur',
              'w-screen h-screen',
              'inset-0',
              'dark:bg-black/50 bg-black/20',
              // 解决滚动问题
              'touch-none'
            )}
            visible={visible}
            onClick={hideMenu}
          />

          <MobileMenuContent
            className={cn(
              'fixed top-4 right-4 z-10',
              'text-card-foreground text-base',
              'max-w-60 w-full',
              'rounded-md shadow-lg p-6 overflow-hidden',
              'bg-popover',
              'origin-top-right'
            )}
            visible={visible}
          >
            <div
              className={cn('size-5 text-primary', 'absolute top-5 right-5 z-20', 'cursor-pointer')}
            >
              <IoMdClose onClick={hideMenu} />
            </div>

            <MobileMenuList className={cn('space-y-6')}>
              {navigationItems.map((item) => (
                <MobileMenuListItem key={item.href} id={item.href}>
                  <LinkWrap href={item.href} onClick={hideMenu}>
                    {item.text}
                  </LinkWrap>
                </MobileMenuListItem>
              ))}
            </MobileMenuList>

            <MobileMenuLinkList
              className={cn('flex', 'mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10')}
            >
              <MobileMenuLinkListItem>
                <ModeToggle />
              </MobileMenuLinkListItem>

              <MobileMenuLinkListItem>
                <Button size={'icon'} variant={'ghost'}>
                  <LinkWrap href='/feed.xml'>
                    <MdRssFeed className='size-5' />
                  </LinkWrap>
                </Button>
              </MobileMenuLinkListItem>
            </MobileMenuLinkList>
          </MobileMenuContent>
        </>,
        document.body
      )}
    </>
  );
};
