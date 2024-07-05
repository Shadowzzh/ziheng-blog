'use client';

import { useProgress } from '@/hooks/useProgress';
import { AnimatePresence, motion, useMotionTemplate } from 'framer-motion';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(null);

export function useProgressBar() {
  const progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error('Need to be inside provider');
  }

  return progress;
}

export function ProgressBar(props: { className?: string; children: ReactNode }) {
  const { className, children } = props;

  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== 'complete' && (
          <motion.div style={{ width }} exit={{ opacity: 0 }} className={className} />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}
