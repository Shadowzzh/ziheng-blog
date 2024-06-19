import { navigationItems } from '@/config/nav';
import { cn } from '@/utils';
import Link from 'next/link';
import { MobileMenus } from './mobile';

interface LayoutMenuProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** LayoutMenu **/
export const LayoutMenu = (props: LayoutMenuProps) => {
  return (
    <>
      {/* menu - pc & ipad */}
      <div
        className={cn(
          'hidden',
          '*:ml-6',
          '*:whitespace-nowrap',
          'text-sm',
          'md:flex flex-nowrap items-center justify-center ',
          props.className
        )}
      >
        {navigationItems.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.text}
          </Link>
        ))}
      </div>

      <MobileMenus />
    </>
  );
};
