import type { ReactNode } from 'react';
import { create } from 'zustand';

interface LayoutStoreState {
  /** 头部额外内容 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breadcrumb: ((args?: Record<string, any>) => ReactNode) | null;
}

interface LayoutStoreActions {
  actions: {
    /** 设置面包屑 */
    setBreadcrumb: (content: LayoutStoreState['breadcrumb']) => void;
    /** 重置面包屑 */
    resetBreadcrumb: () => void;
  };
}

/** 布局的状态管理 */
export const useLayoutStore = create<LayoutStoreState & LayoutStoreActions>((set) => ({
  breadcrumb: null,
  actions: {
    setBreadcrumb: (content) => {
      set({ breadcrumb: content });
    },

    resetBreadcrumb: () => {
      set({ breadcrumb: null });
    }
  }
}));
