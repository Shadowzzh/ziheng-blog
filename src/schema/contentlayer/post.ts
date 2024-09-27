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
    },
    /** 文章封面 - 暗黑模式 */
    imageDark: {
      type: 'string',
      description: 'Heading image dark'
    },
    /** 是否使用视差效果 */
    parallax: {
      type: 'boolean',
      description: 'parallax',
      default: true
    }
  },
  computedFields: {
    ...defaultComputedFields,
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` }
  }
}));
