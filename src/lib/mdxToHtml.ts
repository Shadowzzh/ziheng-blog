import type { VFileCompatible } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { customImageHandler } from './customImageHandler';

/**
 * mdx 转换为 html
 * @param source  mdx 源码
 * @returns html 字符串
 */
export async function mdxToHtml(source: VFileCompatible): Promise<string> {
  const file = await unified() // 将不同的处理步骤（解析、转换、生成）连接起
    // 将 MDX 内容解析成可以被进一步处理的 AST。
    .use(remarkParse)
    // 为了支持 GFM（GitHub Flavored Markdown）语法，需要使用 remark-gfm 插件。
    .use(remarkGfm)
    // 它在 Markdown 解析和 HTML 生成之间起到桥梁作用，将 Markdown 的结构转换为对应的 HTML 结构。
    .use(remarkRehype)
    // 处理自定义的 <Image /> 组件
    .use(customImageHandler)
    // 将 HAST 转换为 HTML 字符串。
    .use(rehypeStringify)

    .process(source);

  return String(file);
}
