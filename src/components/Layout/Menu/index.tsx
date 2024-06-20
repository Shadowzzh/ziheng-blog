import { navigationItems } from '@/config/nav';
import { cn } from '@/utils';
import { MobileMenus } from './mobile';
import { LinkWrap } from '@/components';

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
          <LinkWrap key={index} href={item.href}>
            {item.text}
          </LinkWrap>
        ))}
      </div>

      <MobileMenus />
    </>
  );
};
