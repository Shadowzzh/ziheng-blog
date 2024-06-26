import { defineDocumentType } from 'contentlayer/source-files';
import { defaultComputedFields } from './base';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    /** 文章标题 */
    title: { type: 'string', required: true },
    /** 文章描述 */
    description: { type: 'string', description: 'The date when the post was published' },
    /** 文章日期 */
    date: { type: 'date' },
    /** 最后修改时间 */
    lastModified: {
      type: 'date',
      description: 'The date when the post was last modified'
    },
    /** 白噢钱 */
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Post tags'
    },
    /** 文章封面 */
    image: {
      type: 'string',
      description: 'Heading image'
    }
  },
  computedFields: {
    ...defaultComputedFields,
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` }
  }
}));
