import Image from 'next/image';
import { allPosts, Post } from 'contentlayer/generated';
import Link from 'next/link';
import { cn } from '@/utils';

const allPostsSorted = allPosts.sort((a, b) => {
  if (!a.date || !b.date) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function Posts() {
  return (
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'px-8',
        'm-auto',
        'mt-5  space-y-3'
      )}
    >
      {allPostsSorted.map((post: Post) => {
        return (
          <Link
            href={post.slug}
            key={post._raw.flattenedPath}
            className={cn(
              'flex',
              'bg-neutral-50',
              'shadow-sm rounded-md',
              'overflow-hidden',
              'p-4'
            )}
          >
            <div className={cn('mr-5')}>
              {post.image && (
                <Image
                  className={cn('w-60 h-36', 'rounded-md', 'object-cover')}
                  src={post.image}
                  alt={'cover'}
                  width={200}
                  height={200}
                />
              )}
            </div>

            <div className={cn('flex flex-col justify-between ')}>
              <div>
                <h1 className={cn('text-xl font-bold leading-loose')}>{post.title}</h1>
                <p className={cn('text-base text-neutral-500')}>{post.description}</p>
              </div>

              <div className={cn('text-sm text-neutral-500', 'space-x-4')}>
                <span>文字数量: {post.readingWords}</span>
                <span>阅读时长: {Math.floor(post.readingMinutes)} 分钟</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
