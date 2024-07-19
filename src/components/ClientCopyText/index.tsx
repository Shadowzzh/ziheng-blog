'use client';

import type { ReactNode } from 'react';
import { cn, copyText } from '@/utils';

/** Copy Text */
export const CopyText = (props: { text?: string; children?: ReactNode; className?: string }) => {
  const onCopyWx = () => {
    if (!props.text) return;
    copyText(props.text);
  };

  return (
    <div className={cn(props.className)} onClick={onCopyWx}>
      {props.children}
    </div>
  );
};
