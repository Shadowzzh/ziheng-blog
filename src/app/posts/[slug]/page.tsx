import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Mdx } from '@/components/MDX';
import { postsMapping } from '@/utils/content';
import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { routerMapping } from '@/config/routerMapping';
import { BreadcrumbContainer } from '@/components/Loader/Breadcrumb/Container';
// import { TOCDesktop } from '@/components/TOC'

const LoaderBreadcrumb = dynamic(
  () => import('@/components/Loader/Breadcrumb').then((mod) => mod.LoaderBreadcrumb),
  {
    ssr: false,
    loading: () => (
      <BreadcrumbContainer>
        <Skeleton className={cn('h-5 w-28')} />
      </BreadcrumbContainer>
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
      <LoaderBreadcrumb routerMapping={routerMapping} />

      <article
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'sm:px-0 px-4',
          'm-auto mt-6 mb-6',
          'relative'
        )}
      >
        <div className={cn('2xl:pr-64 xl:pr-44 lg:pr-40')}>
          <div className={cn('sm:my-10 my-7')}>
            <h1 className={cn('text-3xl font-bold text-primary break-words')}>{post.title}</h1>
            <p className={cn('text-base text-muted-foreground mt-3')}>
              {post.date} · {Math.round(post.readingMinutes)} 分钟 · {post.readingWords} 字
            </p>
          </div>

          <Mdx
            code={post.body.code}
            className='prose-stone prose-sm sm:prose !max-w-none dark:prose-invert'
          />
        </div>
      </article>

      {/* <div
        className={cn(
          'fixed top-36 xl:right-[max(0px,calc(50%-36rem))] lg:right-[max(0px,calc(50%-28rem))]',
          '2xl:w-52 w-36'
        )}
      >
        <TOCDesktop
          title={<h2 className={cn('text-xl text-primary ml-1 mb-2')}>目录</h2>}
          className={cn()}
          contentClassName={cn('2xl:h-[calc(60vh)] xl:h-[30rem] overflow-y-auto', 'pl-2 pr-3')}
        />
      </div> */}
    </>
  );
}
