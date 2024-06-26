import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { LayoutMenu } from '../Menu';
import { MobileMenus } from '../Menu/mobile';

interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Layout Header **/
export const LayoutHeader = (props: HeaderProps) => {
  return (
    <header
      className={cn(
        'sm:h-16 h-12 w-screen',
        'border-b border-border/40',
        'backdrop-blur-sm',
        'bg-background/70 dark:bg-background/50',
        'sticky z-40 top-0',
        props.className
      )}
    >
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'px-8',
          'h-full',
          'flex items-center justify-between',
          'm-auto'
        )}
      >
        <div>
          <Logo />
        </div>

        <LayoutMenu />
        <MobileMenus />
      </div>
    </header>
  );
};
