import { AnimatePresence, motion } from 'framer-motion';

interface MobileMenuOverlayProps extends React.HTMLProps<HTMLDivElement> {
  /** 是否显示 */
  visible: boolean;
}

/** 移动端菜单动画 */
export const MobileMenuOverlay = (params: MobileMenuOverlayProps) => {
  const { visible, key, className, onClick } = params;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={className}
          key={key}
          initial={{ opacity: 0 }}
          onClick={onClick}
          animate={{
            opacity: 1,
            transition: { ease: 'easeInOut', duration: 0.3 }
          }}
          exit={{ opacity: 0, transition: { ease: 'easeInOut', duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  );
};

interface MobileMenuContentProps extends React.HTMLProps<HTMLDivElement> {
  /** 是否显示 */
  visible: boolean;
}

/** 移动端菜单内容 */
export const MobileMenuContent = (params: MobileMenuContentProps) => {
  const { visible, key, className, onClick } = params;

  return (
    <AnimatePresence>
      {visible && <motion.div key={key} className={className} onClick={onClick} />}
    </AnimatePresence>
  );
};
