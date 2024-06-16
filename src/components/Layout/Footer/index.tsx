import { cn } from '@/utils';

interface LayoutFooterProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** LayoutFooter **/
export const LayoutFooter = (props: LayoutFooterProps) => {
  return (
    <footer
      className={cn(
        'bg-neutral-900',
        'text-white',
        'text-center',
        ' w-screen h-32',
        'fixed bottom-0 left-0'
      )}
    >
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'px-8 m-auto',
          'pt-6'
        )}
      >
        <div
          className={cn(
            // 'border-solid border border-neutral-600 rounded-md',
            ' w-52',
            'flex justify-between'
          )}
        ></div>
      </div>
    </footer>
  );
};
