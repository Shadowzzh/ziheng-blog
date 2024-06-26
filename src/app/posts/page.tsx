import Image from 'next/image';
import { allPosts, Post } from 'contentlayer/generated';
import { cn } from '@/utils';
import { LinkWrap } from '@/components';

const allPostsSorted = allPosts.sort((a, b) => {
  if (!a.date || !b.date) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default async function Posts() {
  return (
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'sm:px-0 px-4',
        'm-auto',
        'mt-5 mb-5 space-y-6'
      )}
    >
      {allPostsSorted.map((post: Post) => {
        return (
          <LinkWrap
            href={post.slug}
            key={post._raw.flattenedPath}
            className={cn(
              'flex sm:flex-row flex-col',
              'bg-card border text-card-foreground',
              'shadow-sm rounded-md',
              'overflow-hidden',
              'p-4'
            )}
          >
            {post.image && (
              <div className={cn('sm:mr-5 m-0', 'flex-shrink-0')}>
                <Image
                  className={cn(
                    'w-full sm:w-44 md:w-52 lg:w-60  h-36',
                    'rounded-md',
                    'object-cover'
                  )}
                  src={post.image}
                  alt={'cover'}
                  width={200}
                  height={200}
                />
              </div>
            )}

            <div className={cn('flex flex-col justify-between ')}>
              <div>
                <h1 className={cn('sm:text-xl font-bold leading-loose')}>{post.title}</h1>
                {post.description && (
                  <p
                    className={cn(
                      'sm:text-base text-sm text-muted-foreground',
                      'my-2',
                      'text-ellipsis line-clamp-2'
                    )}
                  >
                    {post.description}
                  </p>
                )}
              </div>

              <div className={cn('sm:text-sm text-xs text-muted-foreground', 'space-x-4', 'mt-3')}>
                <span>文字数量：{post.readingWords}</span>
                <span>阅读时长：{Math.floor(post.readingMinutes)} 分钟</span>
              </div>
            </div>
          </LinkWrap>
        );
      })}
    </div>
  );
}
