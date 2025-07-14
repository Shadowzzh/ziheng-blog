import type { FeedOptions } from 'feed';
import { Feed } from 'feed';
import { allPosts } from 'contentlayer/generated';

import { AUTHOR, WEB_SITE_URL } from '@/config/name';
import { mdxToHtml } from '@/lib/mdxToHtml';

const feedOptions: FeedOptions = {
  title: `Hi,${AUTHOR.NAME}`,
  description:
    '我对产品、技术和运动充满热情，运用编码技能实现自己的想法。feedId:57428565962095616+userId:41448350114993152',
  id: WEB_SITE_URL,
  link: WEB_SITE_URL,
  language: 'zh-CN',
  image: `${WEB_SITE_URL}/logo.png`,
  favicon: `${WEB_SITE_URL}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, ${AUTHOR.NAME}`,
  updated: new Date(),
  generator: 'Feed for https://github.com/jpmonette/feed',
  feedLinks: {
    rss2: `${WEB_SITE_URL}/feed.xml`,
    json: `${WEB_SITE_URL}/feed.json`,
    atom: `${WEB_SITE_URL}/atom.xml`
  },
  author: {
    name: AUTHOR.NAME,
    email: AUTHOR.EMAIL,
    link: AUTHOR.TWITTER
  }
};

/**
 * 生成 feed.xml
 * @returns  feed.xml
 */
export const GET = async () => {
  const feed = new Feed(feedOptions);

  await Promise.all(
    allPosts.map(async (post) => {
      const htmlContent = await mdxToHtml(post.body.raw);

      feed.addItem({
        title: post.title,
        id: `${WEB_SITE_URL}${post.slug}`,
        link: `${WEB_SITE_URL}${post.slug}`,
        description: post.description,
        content: htmlContent,
        author: [
          {
            name: AUTHOR.NAME,
            email: AUTHOR.EMAIL,
            link: AUTHOR.TWITTER
          }
        ],
        date: new Date(post.date ?? Date.now()),
        image: post.image ? `${WEB_SITE_URL}${post.image}` : undefined
      });
    })
  );

  return new Response(feed.rss2(), {
    headers: {
      'content-type': 'application/xml'
    }
  });
};
