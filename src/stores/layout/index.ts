import { create } from 'zustand';

interface LayoutStoreState {
  /** 头部额外内容 */
  headerExtraContent: React.ReactNode;
}

interface LayoutStoreActions {
  actions: {
    /** 设置头部额外内容 */
    setHeaderExtraContent: (content: React.ReactNode) => void;
  };
}

/** 布局的状态管理 */
export const useLayoutStore = create<LayoutStoreState & LayoutStoreActions>((set) => ({
  headerExtraContent: null,
  actions: {
    setHeaderExtraContent: (content) => {
      set({ headerExtraContent: content });
    }
  }
}));
