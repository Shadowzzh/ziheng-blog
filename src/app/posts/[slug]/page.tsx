import { Mdx } from '@/components/MDX';
import { notFound } from 'next/navigation';
import { postsMapping } from '@/utils/content';
import { cn } from '@/utils';
import { RouterBreadcrumbs } from '@/components/Layout/Breadcrumb';

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
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'px-8',
        'm-auto mt-6 mb-6'
      )}
    >
      <RouterBreadcrumbs />

      <Mdx
        code={post.body.code}
        className='prose-stone prose-sm sm:prose max-w-none dark:prose-invert'
      />
    </div>
  );
}
