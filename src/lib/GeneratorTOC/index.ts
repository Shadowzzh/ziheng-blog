import { Tree } from '@/models';
import { DEFAULT_TREE_CONFIG, TITLE_TAG_WEIGHT } from './constant';
import type { TreeData } from './type';
import { elementIsEmpty } from '../utils';

export const $: (query: string, target?: HTMLElement) => HTMLElement[] = (
  query: string,
  target = document.body.parentElement!
) => Array.from(target.querySelectorAll(query));

/** 获取 element 标签对应的权重 */
function getWeight(tag: HTMLElement | undefined) {
  if (!tag) return -1;
  const tagName = tag.tagName.toLowerCase() as keyof typeof TITLE_TAG_WEIGHT;
  return TITLE_TAG_WEIGHT[tagName];
}

/**
 * 根据文章内容生成标题 Tree
 * 把所有的标题根据权重生成一标题树，树的根节点是权重最大的标题
 */
export function generatorTocTree(container: HTMLElement) {
  /** 所有标题元素 tag */
  const titleTags = Object.keys(TITLE_TAG_WEIGHT);
  /** 文章中所有的标题元素 */
  const titleElements = $(titleTags.join(','), container) as HTMLElement[];

  // 如果文章中没有标题，则返回 undefined
  if (titleElements.length === 0) return undefined;

  /** 预先计算所有标题的权重 */
  const titleWeights = new Map<HTMLElement, number>(
    titleElements.map((title) => [title, getWeight(title)])
  );

  /** 创建根节点 */
  const rootTree = new Tree<TreeData>();
  /** 前一个标题的 Tree */
  let preTree: Tree<TreeData> = new Tree({
    data: { ...DEFAULT_TREE_CONFIG, element: titleElements[0] }
  });

  // 元素为空，则跳过
  if (elementIsEmpty(preTree?.data?.element)) return;

  // 添加第一个标题到根节点
  rootTree.appendChild(preTree);

  for (let i = 1; i < titleElements.length; i++) {
    const title = titleElements[i]; // 当前标题
    const weight = titleWeights.get(title); // 当前标题的权重
    const preTitle = preTree.data!.element; // 前一个标题

    // 如果标题没有内容，则跳过
    if (elementIsEmpty(title) || !weight || !preTitle) continue;

    const preTitleWeight = titleWeights.get(preTitle); // 前一个标题的权重

    // 创建当前标题的 Tree
    const currentTree = new Tree<TreeData>({ data: { ...DEFAULT_TREE_CONFIG, element: title } });

    if (!preTitleWeight) continue;

    // 如果当前标题的权重小于于前一个标题的权重，则将当前标题添加到前一个标题的子节点中
    if (weight < preTitleWeight) {
      preTree.appendChild(currentTree);
    } else {
      // 向上查找第一个权重大于当前标题权重的标题，将当前标题添加到该标题的子节点中
      let ancestor: Tree<TreeData> | undefined = preTree;
      while ((ancestor = ancestor?.parent)) {
        // 根节点权重默认最大，所以不需要判断，直接添加到根节点中
        if (ancestor.isRoot()) {
          ancestor.root?.appendChild(currentTree);
          break;
        }

        if (!ancestor.data?.element) continue;
        const ancestorWeight = titleWeights.get(ancestor.data.element);

        if (!ancestorWeight) continue;

        // 如果当前标题的权重小于祖先标题的权重，则将当前标题添加到祖先标题的子节点中
        if (weight < ancestorWeight) {
          ancestor.appendChild(currentTree);
          break;
        }
      }
    }

    preTree = currentTree;
  }

  if (rootTree.children.length === 0) return undefined;

  return rootTree;
}
