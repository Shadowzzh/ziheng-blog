import type { ReactNode } from 'react';
import { create } from 'zustand';

interface LayoutStoreState {
  /** 目录显示/隐藏触发器 */
  TocMobileToggle: ReactNode;
  /** 目录 */
  TocMobile: ReactNode;
}

interface LayoutStoreActions {
  actions: {
    /** 设置目录显示/隐藏触发器 */
    setTocMobileToggle: (content: ReactNode) => void;
    /** 重置目录显示/隐藏触发器 */
    resetTocMobileToggle: () => void;

    /** 设置头部额外内容 */
    setTocMobile: (content: ReactNode) => void;
    /** 重置头部额外内容 */
    resetTocMobile: () => void;
  };
}

/** 布局的状态管理 */
export const useLayoutStore = create<LayoutStoreState & LayoutStoreActions>((set) => ({
  TocMobile: null,
  TocMobileToggle: null,
  actions: {
    setTocMobileToggle: (content) => set({ TocMobileToggle: content }),
    resetTocMobileToggle: () => set({ TocMobileToggle: undefined }),
    setTocMobile: (content) => set({ TocMobile: content }),
    resetTocMobile: () => set({ TocMobile: null })
  }
}));
