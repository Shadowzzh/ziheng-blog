'use client';

import Link from 'next/link';
import { LinkWrap } from '../LinkWrap';
import { ComponentProps } from 'react';
import { cn } from '@/utils';

interface MdxLinkProps extends ComponentProps<typeof Link> {}

export const MdxLink = (props: MdxLinkProps) => {
  const { href } = props;
  if (!href) return null;

  return <LinkWrap className={cn('cursor-pointer')} {...props} />;
};
