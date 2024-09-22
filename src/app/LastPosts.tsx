import { cn } from '@/utils';
import { allPosts } from 'contentlayer/generated';
import { LinkWrap } from '@/components/LinkWrap';

interface LastPostsProps {
  className?: string;
}

const lastPosts = allPosts
  .sort((a, b) => {
    const dateA = new Date(a.date ?? '2000').getTime();
    const dateB = new Date(b.date ?? '2000').getTime();

    return dateB - dateA;
  })
  .slice(0, 6);

/** 最新文章 **/
export const LastPosts = (props: LastPostsProps) => {
  return (
    <div className={cn('space-y-3', props.className)}>
      <h3 className={cn('pl-3 sm:pb-6 pb-3', 'text-base text-muted-foreground')}>最新文章</h3>

      {lastPosts.map((post, index) => {
        return (
          <LinkWrap key={index} href={`${post.slug}`}>
            <div
              key={index}
              className={cn(
                'p-3',
                'cursor-pointer',
                'hover:bg-muted',
                'border-l-2 border-transparent hover:border-muted-foreground'
              )}
            >
              <div className={cn('sm:text-xl text-base font-bold')}>{post.title}</div>
              {post.description && (
                <div className={cn('sm:text-sm text-xs mt-1 text-muted-foreground')}>
                  {post.description}
                </div>
              )}
            </div>
          </LinkWrap>
        );
      })}
    </div>
  );
};
