import { Mdx } from '@/components/MDX';
import { notFound } from 'next/navigation';
import { postsMapping } from '@/utils/content';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';

const TOCWithLoading = dynamic(
  async () => await (await import('@/components/TOC')).DesktopOnlyTOC,
  { ssr: false }
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
            <h1 className={cn('text-3xl font-bold text-primary')}>{post.title}</h1>
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

      <div
        className={cn(
          'fixed top-36 xl:right-[max(0px,calc(50%-36rem))] lg:right-[max(0px,calc(50%-28rem))]',
          '2xl:w-52 w-36'
        )}
      >
        <TOCWithLoading
          title={<h2 className={cn('text-xl text-primary ml-1 mb-2')}>目录</h2>}
          className={cn()}
          contentClassName={cn('2xl:h-[calc(60vh)] xl:h-[30rem] overflow-y-auto', 'pl-2 pr-3')}
        />
      </div>
    </>
  );
}
