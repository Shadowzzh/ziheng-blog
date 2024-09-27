import type { HastRoot } from 'remark-rehype/lib';
import { visit } from 'unist-util-visit';
import { parseHtmlAttributes } from './utils';

/**
 * 解析自定义的 <Image /> 组件
 * @param content
 * @returns
 */
const parseAttributesFromImage = (content: string): Record<string, string> | undefined => {
  const regex = /<Image\s+([^>]+?)\/>/;
  const match = content.match(regex);

  if (!match) return undefined;
  const attributes = parseHtmlAttributes(match[1]);

  // 只需要这些属性
  return {
    src: attributes.src,
    alt: attributes.alt,
    width: attributes.width,
    height: attributes.height
  };
};

/**
 * 处理自定义的 <Image /> 组件
 * @returns
 */
export const customImageHandler = () => {
  return (tree: HastRoot) => {
    return visit(tree, 'element', (node) => {
      const firstChild = node.children[0];

      // 如果不是文本节点，直接返回
      if (!firstChild || firstChild.type !== 'text') return;

      // 如果不是自定义的 <Image /> 组件，直接返回
      if (typeof firstChild.value !== 'string' || !firstChild.value.includes('<Image')) return;

      const properties = parseAttributesFromImage(firstChild.value);

      // 替换自定义的 <Image /> 组件
      const newNode = {
        ...node,
        type: 'element' as const,
        tagName: 'img',
        properties,
        children: []
      };

      // 将自定义的 <Image /> 组件替换为 <img /> 标签
      node.children = [newNode];
    });
  };
};
