'use client';

import type { Tree } from '@/models';
import type { TreeData } from '@/lib/GeneratorTOC/type';

import React, { useEffect, type HTMLProps } from 'react';
import { useMedia } from 'react-use';
import { CgMenuLeft } from 'react-icons/cg';
import { SCREEN_CONFIG } from '@/config/screen';
import { cn } from '@/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { generatorTocTree } from '@/lib/GeneratorTOC';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useActiveTitle } from './hooks/useActiveTitle';

interface TOCMobileProps {
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

  // 有子节点时显示箭头
  const Icon = tree.children.length > 0 && (
    <MdKeyboardArrowDown
      className={cn(
        'size-4 mt-[0.1rem] mr-1 flex-shrink-0',
        'opacity-30 hover:opacity-100',
        'flex-shrink-0'
      )}
    />
  );

  return (
    <div>
      {data?.element?.textContent && (
        <div className={cn('text-muted-foreground', 'flex items-start', 'overflow-hidden', 'mb-2')}>
          {Icon}
          <div
            className={cn(
              'cursor-pointer',
              'font-medium text-sm text-muted-foreground hover:text-primary',
              'opacity-60 hover:opacity-80',
              'text-ellipsis line-clamp-2',
              'flex-1',
              isActive ? 'text-primary opacity-100' : ''
            )}
            title={data.element.textContent}
            onClick={() => onClickTitle(tree)}
          >
            {data.element.textContent}
          </div>
        </div>
      )}

      {children.length > 0 && (
        <div className='ml-5 group'>
          {children.map((child) => (
            <TreeItem
              key={child.uniqueId}
              tree={child}
              onClickTitle={onClickTitle}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TitleContent = (props: TOCMobileProps) => {
  const [tocTree, setTocTree] = React.useState<Tree<TreeData> | undefined>();

  const [articleContent, setArticleContent] = React.useState<HTMLElement | undefined>();
  const [headerHeight, setHeaderHeight] = React.useState<number>(0);

  const activeId = useActiveTitle({ content: articleContent, mergeTop: headerHeight + 20 });

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
    <div className={props.className}>
      <aside
        className={cn('overflow-y-auto h-[80vh]', 'mr-[-1.5rem] pr-[1.5rem]', props.className)}
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
    </div>
  );
};

const TOCMobile = (props: TOCMobileProps) => {
  return (
    <Sheet>
      <SheetTrigger className={cn('flex justify-center items-start')} aria-label='打开目录'>
        <CgMenuLeft className={cn('size-5 text-muted-foreground mr-2')} />
      </SheetTrigger>

      <SheetContent side={'left'} className={cn('w-[70vw]')}>
        <SheetHeader className='mb-2'>
          <SheetTitle>目录</SheetTitle>
        </SheetHeader>

        <TitleContent {...props} />
      </SheetContent>
    </Sheet>
  );
};

/** 只在手机端显示 */
export const MobileOnlyTOC = (props: TOCMobileProps) => {
  const isMobile = useMedia(`(max-width: ${SCREEN_CONFIG.LG}px)`);

  if (!isMobile) {
    return null;
  }

  return <TOCMobile {...props} />;
};
