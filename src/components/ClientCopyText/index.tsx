'use client';

import { cn, copyText } from '@/utils';
import { toast } from 'sonner';

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  children?: React.ReactNode;
  /** 是否显示复制成功提示 */
  showToast?: boolean;
}

/** Copy Text */
export const CopyText = (props: CopyTextProps) => {
  const onCopyWx = () => {
    if (!props.text) return;
    copyText(props.text);

    if (props.showToast) {
      toast.success('复制成功', {
        description: props.text
      });
    }
  };

  return (
    <div className={cn(props.className)} onClick={onCopyWx}>
      {props.children}
    </div>
  );
};
