'use client';

import type { HTMLProps } from 'react';
import type { Tree } from '@/models';
import type { TreeData } from '@/lib/GeneratorTOC/type';

import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useMedia } from 'react-use';
import { SCREEN_CONFIG } from '@/config/screen';
import { generatorTocTree } from '@/lib/GeneratorTOC';
import { cn } from '@/utils';
import { useActiveTitle } from './hooks/useActiveTitle';

interface TOCDesktopProps {
  nativeAttrs?: HTMLProps<HTMLElement>;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  title?: React.ReactNode;
}

const TreeItem = (props: {
  tree: Tree<TreeData>;
  className?: string;
  activeId?: string;
  onClickTitle: (title: Tree<TreeData>) => void;
}) => {
  const { tree, onClickTitle, activeId } = props;
  const { data, children } = tree;

  const isActive = activeId === data?.element?.getAttribute('id');

  return (
    <div>
      {data?.element?.textContent && (
        <div className={cn('py-1 text-muted-foreground', 'flex items-start', 'overflow-hidden')}>
          {tree.children.length > 0 && (
            <MdKeyboardArrowDown
              className={cn('size-4 mt-[0.2rem] flex-shrink-0', 'opacity-30 hover:opacity-100')}
            />
          )}
          <div
            className={cn(
              'cursor-pointer',
              'font-medium text-sm leading-6 text-muted-foreground hover:text-primary',
              'opacity-50 hover:opacity-80',
              'text-ellipsis line-clamp-2',
              isActive ? 'text-primary opacity-100' : ''
            )}
            title={data.element.textContent}
            onClick={() => onClickTitle(tree)}
          >
            {data.element.textContent}
          </div>
        </div>
      )}

      <div className='ml-4 group'>
        {children.map((child) => (
          <TreeItem
            key={child.uniqueId}
            tree={child}
            onClickTitle={onClickTitle}
            activeId={activeId}
          />
        ))}
      </div>
    </div>
  );
};

/** TOCDesktop 目录桌面端 */
export const TOCDesktop = (props: TOCDesktopProps) => {
  const [tocTree, setTocTree] = React.useState<Tree<TreeData> | undefined>();

  const [articleContent, setArticleContent] = React.useState<HTMLElement | undefined>();
  const [headerHeight, setHeaderHeight] = React.useState<number>(0);

  const activeId = useActiveTitle({ content: articleContent, mergeTop: headerHeight + 5 });

  // 初始化目录
  useEffect(() => {
    const articleContent = document.getElementById('article-content');
    const header = document.getElementById('layout-header');
    if (header) {
      setHeaderHeight(header?.getBoundingClientRect().height ?? 0);
    }

    if (articleContent) {
      setArticleContent(articleContent);
      const TocTree = generatorTocTree(articleContent);
      if (TocTree) {
        setTocTree(TocTree);
      }
    }
  }, []);

  /** 点击标题 */
  const onClickTitle = (tree: Tree<TreeData>) => {
    if (!tree.data?.element) return;

    const id = tree.data.element.getAttribute('id');
    if (!id) return;

    // 滚动到指定位置
    window.location.hash = '';
    window.location.hash = id;
  };

  return (
    <aside
      className={cn(props.className)}
      {...props.nativeAttrs}
      onTouchMove={(e) => e.preventDefault()}
    >
      {props.title}
      {tocTree && (
        <ul className={cn(props.contentClassName)}>
          {tocTree.children.map((item) => {
            return (
              <TreeItem
                tree={item}
                key={item.uniqueId}
                onClickTitle={onClickTitle}
                activeId={activeId}
              />
            );
          })}
        </ul>
      )}
    </aside>
  );
};

/** DesktopOnlyTOC 只在桌面端显示目录 */
export const DesktopOnlyTOC = (props: TOCDesktopProps) => {
  const isDesktop = useMedia(`(min-width: ${SCREEN_CONFIG.LG}px)`);

  if (!isDesktop) {
    return null;
  }

  return <TOCDesktop {...props} />;
};
