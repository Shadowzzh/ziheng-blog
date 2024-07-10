'use client';

import { useProgress } from '@/hooks/useProgress';
import { AnimatePresence, motion, useMotionTemplate } from 'framer-motion';
import { useMount } from 'react-use';
import { create } from 'zustand';

interface ProgressBarStoreState {
  start: () => void;
  setStart: (start: () => void) => void;
  done: () => void;
  setDone: (done: () => void) => void;
}

/** `页面加载`进度条状态管理 */
export const useProgressBarStore = create<ProgressBarStoreState>((set) => ({
  setStart: (start: () => void) => set({ start: start }),
  start: () => {},
  setDone: (done: () => void) => set({ done: done }),
  done: () => {}
}));

export const ProgressBar = (props: { className?: string }) => {
  const { className } = props;

  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  const setStart = useProgressBarStore((state) => state.setStart);
  const setDone = useProgressBarStore((state) => state.setDone);

  useMount(() => {
    setStart(progress.start);
    setDone(progress.done);
  });

  return (
    <AnimatePresence onExitComplete={progress.reset}>
      {progress.state !== 'complete' && (
        <motion.div style={{ width }} exit={{ opacity: 0 }} className={className} />
      )}
    </AnimatePresence>
  );
};
