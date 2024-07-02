import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { LayoutMenu } from '@/app/Menus';
import { MobileMenus } from '@/app/MenusMobile';

interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Layout Header **/
export const LayoutHeader = (props: HeaderProps) => {
  return (
    <header
      id='layout-header'
      className={cn(
        'sm:border-b border-border/40',
        'sm:h-16 h-12',
        'sm:px-8 px-4',
        props.className
      )}
    >
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'sm:border-b border-border/40',
          'h-full',
          'flex items-center justify-between',
          'm-auto',
          'sm:border-0 border-b border-border/40'
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
