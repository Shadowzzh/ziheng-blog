'use client';

import type { HTMLProps } from 'react';
import type { Tree } from '@/models';
import type { TreeData } from '@/lib/GeneratorTOC/type';

import React, { useEffect } from 'react';
import { generatorTocTree } from '@/lib/GeneratorTOC';
import { cn } from '@/utils';
import { useActiveTitle } from './hooks/useActiveTitle';

export interface TOCDesktopProps {
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
  index: number;
  onClickTitle: (title: Tree<TreeData>) => void;
}) => {
  const { tree, onClickTitle, activeId, index } = props;
  const { data, children, depth } = tree;

  const isActive = activeId === data?.element?.getAttribute('id');

  return (
    <div>
      {data?.element?.textContent && (
        <div
          className={cn(
            'flex items-start',
            'text-muted-foreground text-sm',
            'overflow-hidden',
            'cursor-pointer',
            'opacity-90 hover:opacity-100',
            'rounded-sm',
            'px-1',
            isActive && 'dark:bg-accent/50 bg-primary/10'
          )}
          title={data.element.textContent}
          onClick={() => onClickTitle(tree)}
        >
          <span className={cn('m-1 mr-2')}>
            {depth}
            {index ? `.${index}` : ''}
          </span>
          <div
            className={cn('text-ellipsis line-clamp-2', 'flex-1', 'py-1')}
            title={data.element.textContent}
            onClick={() => onClickTitle(tree)}
          >
            {data.element.textContent}
          </div>
        </div>
      )}

      <div className='ml-3 group'>
        {children.map((child, i) => (
          <TreeItem
            index={index + i}
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
          {tocTree.children.map((item, index) => {
            return (
              <TreeItem
                tree={item}
                index={index}
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
