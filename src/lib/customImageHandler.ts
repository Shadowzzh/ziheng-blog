import type { Root } from 'remark-parse/lib';
import { visit } from 'unist-util-visit';

/**
 * 解析自定义的 <Image /> 组件
 * @param content
 * @returns
 */
const replaceImageTag = (content: string): string => {
  const regex = /<Image\s+([^>]+?)\/>/;
  const match = content.match(regex);

  if (!match) return content;

  const attributes = match[1].split('\n').reduce(
    (acc, attr) => {
      const [key, value] = attr.trim().split('=');
      if (key && value) {
        acc[key] = value.replace(/['"{}]/g, '');
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const imgTag = String.raw`<img
    src="${attributes.src || ''}"
    alt="${attributes.alt || ''}"
    ${attributes.width ? `width="${attributes.width}"` : ''}
    ${attributes.height ? `height="${attributes.height}"` : ''}
  />`;

  return content.replace(match[0], imgTag);
};

/**
 * 处理自定义的 <Image /> 组件
 * @returns
 */
export const customImageHandler = () => {
  return (tree: Root) => {
    return visit(tree, 'text', (node) => {
      if (typeof node.value === 'string' && node.value.includes('<Image')) {
        node.value = replaceImageTag(node.value);
      }
    });
  };
};
