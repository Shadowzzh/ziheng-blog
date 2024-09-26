import { Post } from './src/schema/contentlayer/post';
import { makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const source = makeSource({
  contentDirPath: './src/content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      // 不要升级 remark-gfm 否则，contentlayer 会报错
      remarkGfm,
      remarkBreaks
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        // @ts-expect-error https://github.com/rehype-pretty/rehype-pretty-code/issues/145
        rehypePrettyCode,
        {
          // 代码主题类型 https://unpkg.com/browse/shiki@0.14.2/themes/
          theme: 'one-dark-pro',
          // 要应用自定义背景而不是从主题继承背景
          keepBackground: false
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            // 锚点类名
            className: ['anchor']
          }
        }
      ]
    ]
  }
});

export default source;
