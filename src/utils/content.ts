import { allPosts } from 'contentlayer/generated';

/** slug 映射的 post map */
export const postsMapping = new Map(
  allPosts.map((post) => {
    return [post.slug, post];
  })
);
