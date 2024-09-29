import { AnimatePresence, motion } from 'framer-motion';

interface MobileMenuOverlayProps extends React.HTMLProps<HTMLDivElement> {
  /** 是否显示 */
  visible: boolean;
}

/** 移动端菜单动画 */
export const MobileMenuOverlay = (params: MobileMenuOverlayProps) => {
  const { visible, className, onClick } = params;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={className}
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
  const { visible, key, className, children } = params;

  const closeAnimation = {
    opacity: 0,

    transform: 'scale(0.8)'
  };

  const openAnimation = {
    opacity: 1,
    transform: 'scale(1)'
  };

  const transitionConfig = {
    ease: [0.075, 0.82, 0.165, 1],
    duration: 0.7
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          className={className}
          initial={closeAnimation}
          animate={{
            ...openAnimation,
            transition: transitionConfig
          }}
          exit={{
            ...closeAnimation,
            transition: transitionConfig
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MobileMenuListProps extends React.HTMLProps<HTMLUListElement> {}

/** 移动端菜单列表 */
export const MobileMenuList = (params: MobileMenuListProps) => {
  const { className, children } = params;

  return (
    <motion.ul
      className={className}
      initial='exit'
      animate='visible'
      exit='exit'
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.ul>
  );
};

/** 移动端菜单列表项 */
export const MobileMenuListItem = (params: MobileMenuListProps) => {
  const { id, className, children } = params;

  const transitionConfig = {
    ease: [0.165, 0.84, 0.44, 1.0],
    duration: 0.5
  };

  const x = 12;

  return (
    <motion.li
      key={id}
      className={className}
      variants={{
        visible: {
          transform: 'translateX(0)',
          opacity: 1,
          transition: transitionConfig
        },
        exit: {
          transform: `translateX(${x}px)`,
          opacity: 0,
          transition: transitionConfig
        }
      }}
    >
      {children}
    </motion.li>
  );
};

/** 移动端菜单链接列表 */
export const MobileMenuLinkList = (params: MobileMenuListProps) => {
  const { id, className, children } = params;

  return (
    <motion.div
      key={id}
      className={className}
      initial='exit'
      animate='visible'
      exit='exit'
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/** 移动端菜单链接列表项 */
export const MobileMenuLinkListItem = (params: MobileMenuListProps) => {
  const { id, className, children } = params;

  const x = 16;

  return (
    <motion.div
      key={id}
      className={className}
      variants={{
        visible: {
          transform: 'translateX(0)',
          opacity: 1,
          transition: {
            ease: [0.165, 0.84, 0.44, 1.0],
            duration: 1
          }
        },
        exit: {
          transform: `translateX(${x}px)`,
          opacity: 0,
          transition: {
            ease: [0.165, 0.84, 0.44, 1.0],
            duration: 1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
