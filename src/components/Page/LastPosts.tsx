import { cn } from '@/utils';
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

interface LastPostsProps {
  className?: string;
}

const lastPosts = allPosts
  .sort((a, b) => {
    const dateA = new Date(a.date ?? '2000').getTime();
    const dateB = new Date(b.date ?? '2000').getTime();

    return dateA - dateB;
  })
  .slice(0, 3);

/** 最新文章 **/
export const LastPosts = (props: LastPostsProps) => {
  return (
    <div
      className={cn(
        'p-4',
        'shadow-sm rounded-lg bg-card border',
        'space-y-3',
        'cursor-pointer',
        'mb-4',
        props.className
      )}
    >
      {lastPosts.map((post, index) => {
        return (
          <Link key={index} href={`${post.slug}`}>
            <div
              key={index}
              className={cn('p-3', 'rounded-md', 'hover:bg-accent', 'text-card-foreground')}
            >
              <div className={cn('sm:text-xl text-base font-bold')}>{post.title}</div>
              <div className={cn('sm:text-sm text-xs mt-1 text-muted-foreground')}>
                {post.description}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
