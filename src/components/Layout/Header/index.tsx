import { Logo } from '@/components/Logo';
import { cn } from '@/utils';
import { LayoutMenu } from '../Menu';

interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** Layout Header **/
export const LayoutHeader = (props: HeaderProps) => {
  return (
    <header
      className={cn('sm:h-16 h-12 w-screen', 'bg-neutral-800', ' sticky z-50 top-0', props.className)}
    >
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
