import Image from 'next/image';
import { allPosts, Post } from 'contentlayer/generated';
import Link from 'next/link';

const allPostsSorted = allPosts.sort((a, b) => {
  if (!a.date || !b.date) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function Posts() {
  return (
    <div>
      {allPostsSorted.map((post: Post) => {
        console.log('🚀 ~ returnallPostsSorted.forEach ~ post:', post.title);
        return (
          <Link href={post.slug} key={post._raw.flattenedPath}>
            <div className=' text-white'>
              <h1>{post.title}</h1>
              {post.image && <Image src={post.image} alt={'cover'} width={200} height={200} />}
              <p>{post.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
