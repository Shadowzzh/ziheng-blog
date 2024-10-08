'use client';

import { createPortal } from 'react-dom';
import type React from 'react';
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
  MenuContainer,
  LinkGroup,
  LinkItem,
  MenuGroup,
  MenuItem,
  Overlay
} from '@/app/NavigationBarMobileAnimation';
import { MobileOnly } from '@/components/PlatformOnly';
import { ClientOnly } from '@/components/ClientOnly';

export interface NavigationBarMobileProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** 只在移动端显示 */
export const NavigationBarMobileOnly = (props: NavigationBarMobileProps) => {
  return (
    <ClientOnly>
      <MobileOnly>
        <NavigationBarMobile {...props} />
      </MobileOnly>
    </ClientOnly>
  );
};

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
      {createPortal(
        <div
          className={cn(
            'fixed sm:top-2 sm:right-2 top-[0.15rem] right-[0.15rem]  cursor-pointer',
            'md:hidden',
            'flex items-center justify-center',
            'p-3',
            visible ? 'z-10' : 'z-[11]',
            props.className
          )}
          onClick={showMenu}
        >
          <RiMore2Fill className={cn('sm:size-6 size-5', 'text-foreground')} />
        </div>,
        document.body
      )}

      {/* mobile - 展开 */}
      {createPortal(
        <>
          {/* 覆盖 overlay */}
          <Overlay
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

          <MenuContainer
            className={cn(
              'fixed top-4 right-4 z-10',
              'text-card-foreground text-base',
              'w-52',
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

            <MenuGroup className={cn('space-y-6')}>
              {navigationItems.map((item) => (
                <MenuItem key={item.href} id={item.href}>
                  <LinkWrap href={item.href} onClick={hideMenu}>
                    {item.text}
                  </LinkWrap>
                </MenuItem>
              ))}
            </MenuGroup>

            <LinkGroup
              className={cn('flex', 'mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10')}
            >
              <LinkItem>
                <ModeToggle />
              </LinkItem>

              <LinkItem>
                <Button size={'icon'} variant={'ghost'}>
                  <LinkWrap href='/feed.xml'>
                    <MdRssFeed className='size-5' />
                  </LinkWrap>
                </Button>
              </LinkItem>
            </LinkGroup>
          </MenuContainer>
        </>,
        document.body
      )}
    </>
  );
};
