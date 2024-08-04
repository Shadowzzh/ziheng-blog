import { navigationItems } from '@/config/nav';
import { cn } from '@/utils';
import { LinkWrap } from '@/components';
import { ModeToggle } from '@/components/ThemeProvider/ThemeToggle';
import { Button } from '@/components/ui/button';
import { MdOutlineRssFeed } from 'react-icons/md';

interface LayoutMenuProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/** NavigationBar */
export const NavigationBar = (props: LayoutMenuProps) => {
  return (
    <div
      className={cn(
        'hidden',
        '*:whitespace-nowrap',
        'text-sm',
        'md:flex flex-nowrap items-center justify-center ',
        props.className
      )}
    >
      <div className='space-x-6'>
        {navigationItems.map((item, index) => (
          <LinkWrap
            className='text-muted-foreground hover:text-accent-foreground'
            key={index}
            href={item.href}
          >
            {item.text}
          </LinkWrap>
        ))}
      </div>

      <div className='ml-4 flex items-center text-muted-foreground'>
        <Button size={'icon'} variant={'ghost'}>
          <LinkWrap href='/feed.xml'>
            <MdOutlineRssFeed className='size-5' />
          </LinkWrap>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
