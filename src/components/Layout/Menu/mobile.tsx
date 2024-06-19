'use client';

import { cn } from '@/utils';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { navigationItems } from '@/config/nav';

interface MobileMenusProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * MobileMenus
 *
 * 注：之前使用纯 CSS :target 伪类实现，因为可以在服务端渲染。
 *    但是点击内 li 的 Link无法关闭，所以改用 React 实现。
 **/
export const MobileMenus = (props: MobileMenusProps) => {
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
        <FiMenu className='size-6 cursor-pointer' onClick={showMenu} />
      </div>

      {/* mobile - 展开 */}
      {visible && (
        <div
          className={cn(
            'w-screen h-screen',
            'fixed top-0 left-0 z-40',
            'backdrop-blur-sm',
            // 解决滚动问题
            'touch-none'
          )}
        >
          <div
            className={cn(
              'fixed top-4 right-4 z-50',
              ' text-neutral-600 text-base',
              'fixed max-w-xs w-full',
              'bg-white rounded-md shadow-lg p-6 overflow-hidden'
            )}
          >
            <IoMdClose
              className={cn('size-5', 'absolute top-6 right-6 text-neutral-900', 'cursor-pointer')}
              onClick={hideMenu}
            />

            <ul className={cn('space-y-6')}>
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} onClick={hideMenu}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
