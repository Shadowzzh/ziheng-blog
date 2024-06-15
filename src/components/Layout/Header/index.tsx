import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { LayoutMenu } from '../Menu';

interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Layout Header **/
export const Header = (props: HeaderProps) => {
  return (
    <header className={cn('h-16', 'bg-neutral-900')}>
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'px-8',
          'h-full',
          'flex items-center justify-between',
          'm-auto',
          ' text-white'
        )}
      >
        <div>
          <Logo />
        </div>

        <div>
          <LayoutMenu />
        </div>
      </div>
    </header>
  );
};
