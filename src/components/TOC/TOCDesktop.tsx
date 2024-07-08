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
  onClickTitle: (title: Tree<TreeData>) => void;
}) => {
  const { tree, onClickTitle } = props;
  const { data, children } = tree;

  return (
    <div>
      {data?.element?.textContent && (
        <div
          className={cn(
            'py-1 text-muted-foreground',
            'flex items-start',
            'cursor-pointer',
            'overflow-hidden'
          )}
        >
          {tree.children.length > 0 && (
            <MdKeyboardArrowDown
              className={cn('size-4 mt-[0.1rem] flex-shrink-0', 'opacity-30 hover:opacity-100')}
            />
          )}
          <div
            className={cn(
              'font-medium xl:text-sm text-base leading-6 text-muted-foreground hover:text-primary',
              'opacity-80 hover:opacity-100',
              'text-ellipsis  line-clamp-2'
            )}
            title={data.element.textContent}
            onClick={() => onClickTitle(tree)}
          >
            {data.element.textContent}
          </div>
        </div>
      )}

      <div className='ml-1 group'>
        {children.map((child) => (
          <TreeItem key={child.uniqueId} tree={child} onClickTitle={onClickTitle} />
        ))}
      </div>
    </div>
  );
};

/** TOCDesktop 目录桌面端 */
export const TOCDesktop = (props: TOCDesktopProps) => {
  const [tocTree, setTocTree] = React.useState<Tree<TreeData> | undefined>();

  // 初始化目录
  useEffect(() => {
    const articleContent = document.getElementById('article-content');
    if (articleContent) {
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
            return <TreeItem tree={item} key={item.uniqueId} onClickTitle={onClickTitle} />;
          })}
        </ul>
      )}
    </aside>
  );
};

/** DesktopOnlyTOC 只在桌面端显示目录 */
export const DesktopOnlyTOC = (props: TOCDesktopProps) => {
  const isDesktop = useMedia(`(min-width: ${SCREEN_CONFIG.XL}px)`);

  if (!isDesktop) {
    return null;
  }

  return <TOCDesktop {...props} />;
};
