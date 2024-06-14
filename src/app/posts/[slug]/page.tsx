'use client';

import { Mdx } from '@/components/MDX';
import { notFound } from 'next/navigation';
import { postsMapping } from '@/utils/content';

interface BlogDetailProps {
  params: { slug: string };
}

/** 博文详情 */
export default function BlogDetail(props: BlogDetailProps) {
  const { slug } = props.params;

  const post = postsMapping.get(`/posts/${slug}`);
  if (!post) return notFound();

  return (
    <div className=' mx-auto mt-28 max-w-[40rem]'>
      <Mdx code={post.body.code} className='prose max-w-none dark:prose-invert' />
    </div>
  );
}
