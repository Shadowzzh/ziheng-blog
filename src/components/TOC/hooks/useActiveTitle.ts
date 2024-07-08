import { getAllArticleTitle } from '@/lib/GeneratorTOC';
import { getOffsetTopElement } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';

/** 活动中的标题 */
export const useActiveTitle = (props: { content?: HTMLElement; mergeTop?: number }) => {
  const { content, mergeTop = 0 } = props;

  const titleRectMap = useRef(new Map<string, number>());
  const { y } = useWindowScroll();

  const [activeId, setActiveId] = useState<string>();

  // 获取所有标题的位置信息
  useEffect(() => {
    if (!content) return;
    const allArticleTitle = getAllArticleTitle(content);

    // 默认选中第一个标题
    const firstTitle = allArticleTitle[0]?.getAttribute('id');
    firstTitle && setActiveId(firstTitle);

    allArticleTitle.forEach((title) => {
      const id = title.getAttribute('id');
      if (id === null) return;

      titleRectMap.current.set(id, getOffsetTopElement(title));
    });
  }, [content]);

  // 根据滚动位置获取活动中的标题
  useEffect(() => {
    const titleRectList = Array.from(titleRectMap.current.entries());

    const activeId = titleRectList.reduce(
      (acc, [id, top]) => {
        if (y + mergeTop + 1 > top) {
          acc = id;
        }
        return acc;
      },
      undefined as string | undefined
    );

    if (activeId) {
      setActiveId(activeId);
    }
  }, [mergeTop, y]);

  return activeId;
};
