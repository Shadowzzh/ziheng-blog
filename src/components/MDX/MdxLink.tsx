'use client';

import Link from 'next/link';

import { ComponentProps } from 'react';
import { cn } from '@/utils';

interface MdxLinkProps extends ComponentProps<typeof Link> {}

export const MdxLink = (props: MdxLinkProps) => {
  const { href } = props;
  if (!href) return null;

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof href !== 'string') {
      return;
    }

    const layoutHeader = document.querySelector('#layout-header');
    const layoutHeaderRect = layoutHeader?.getBoundingClientRect();

    if (!layoutHeaderRect) {
      return;
    }

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop - layoutHeaderRect.height;

      e.preventDefault();
      scrollTo({ top: targetPosition });
    }
  };

  return <Link className={cn('cursor-pointer')} onClick={onClickLink} {...props} />;
};
