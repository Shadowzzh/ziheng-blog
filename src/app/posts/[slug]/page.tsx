import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Mdx } from '@/components/MDX';
import { postsMapping } from '@/utils/content';
import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';

const LoaderMobileToc = dynamic(
  () => import('@/components/Loader/TocMobile').then((mod) => mod.LoaderMobileToc),
  { ssr: false }
);

const DesktopOnlyTOC = dynamic(
  () => import('@/app/posts/[slug]/DesktopOnlyTOC').then((mod) => mod.DesktopOnlyTOC),
  {
    ssr: false,
    loading: () => (
      <div className='h-24 space-y-2 px-3'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    )
  }
);

interface BlogDetailProps {
  params: { slug: string };
}

interface GenerateMetadataProps {
  params: { slug: string };
}

export async function generateMetadata(props: GenerateMetadataProps) {
  const { slug } = props.params;

  const post = postsMapping.get(`/posts/${slug}`);
  if (!post) return {};

  const { title, description, date } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date
    }
  };
}

/** 博文详情 */
export default function BlogDetail(props: BlogDetailProps) {
  const { slug } = props.params;

  const post = postsMapping.get(`/posts/${slug}`);
  if (!post) return notFound();

  return (
    <>
      <LoaderMobileToc />
      <article className={cn('sm:px-8 px-4', 'm-auto mt-6 mb-6', 'relative')}>
        <div className={cn('lg:max-w-5xl m-auto', 'lg:pr-72')}>
          <div className={cn('sm:my-10 my-7')}>
            <h1 className={cn('text-3xl font-bold text-primary break-words')}>{post.title}</h1>
            <p className={cn('text-base dark:text-muted-foreground text-accent-foreground mt-3')}>
              {post.date} · {Math.round(post.readingMinutes)} 分钟 · {post.readingWords} 字
            </p>
          </div>

          <Mdx
            code={post.body.code}
            className='prose-stone prose-sm sm:prose !max-w-none dark:prose-invert'
          />
        </div>
      </article>

      <div
        className={cn(
          'hidden lg:block',
          'fixed top-36',
          ' md:right-[max(0px,calc(50%-32rem))]',
          '2xl:w-64 w-52'
        )}
      >
        <DesktopOnlyTOC
          className={cn(
            'dark:hover:bg-muted/10 hover:bg-muted/40 ',
            // 'opacity-60 hover:opacity-100',
            ' p-3 pl-0 rounded-md',
            'transition-all ease-in-out duration-500'
          )}
          contentClassName={cn('h-[calc(70vh)] overflow-y-auto', 'pl-2 pr-4 mr-[-1rem]')}
        />
      </div>
    </>
  );
}
