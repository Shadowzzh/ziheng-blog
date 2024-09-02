import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

/**
 * 使用 parallax 效果
 * @returns
 */
export const useParallax = () => {
  const { scrollY } = useScroll();

  const transformY = useTransform(scrollY, [0, 200], [-50, 50]);
  const [y, setY] = useState(0);

  useMotionValueEvent(transformY, 'change', (latest) => {
    setY(latest);
  });

  return {
    y,
    scrollY
  };
};
