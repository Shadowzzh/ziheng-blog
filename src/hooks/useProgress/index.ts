import { useEffect, useState } from 'react';
import { useInterval } from '../useInterval';
import { useSpring } from 'framer-motion';

interface UseProgressProps {
  /** The duration of the progress animation in milliseconds */
  duration?: number;
}

interface UseProgressReturn {
  /** The current state of the progress */
  state: useProgressState;
  /** The current value of the progress */
  value: ReturnType<typeof useSpring>;
  /** Start the progress */
  start: () => void;
  /** Complete the progress */
  done: () => void;
  /** Reset the progress */
  reset: () => void;
}

type useProgressState = 'initial' | 'in-progress' | 'completing' | 'complete';

/** 随机生成 min 和 max（包括 min 和 max）之间的随机整数 */
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useProgress = (props?: UseProgressProps): UseProgressReturn => {
  const { duration = 500 } = props ?? {};

  const [state, setState] = useState<useProgressState>('initial');

  /** 是否是加载中 */
  const isInProgress = state === 'in-progress';

  // 创建一个 spring 动画状态
  const springInstance = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1
  });

  const intervalHandle = () => {
    // 到 100% 时，跳到 0%
    if (springInstance.get() === 100) {
      springInstance.jump(0);
    }

    const current = springInstance.get();

    let diff;
    // 第一次加载 15 %
    if (current === 0) {
      diff = 15;
    }
    // 50% 以下，每次增加 1-10
    else if (current < 50) {
      diff = rand(1, 10);
    }
    // 50% 以上，每次增加 1-5
    else {
      diff = rand(1, 5);
    }

    // 设置 springInstance 的值，最多加载到 99%
    springInstance.set(Math.min(current + diff, 99));
  };

  useInterval(intervalHandle, isInProgress ? duration : null);

  /** 监听 springInstance 的变化 */
  useEffect(() => {
    springInstance.on('change', (latest) => {
      if (latest === 100) {
        setState('complete');
      }
    });

    return () => {
      springInstance.destroy();
    };
  }, [springInstance]);

  /** state 变化后 同步 springInstance 的状态 */
  useEffect(() => {
    switch (state) {
      case 'initial':
        springInstance.jump(0);
        break;

      case 'completing':
        springInstance.set(100);
        break;

      default:
        break;
    }
  }, [springInstance, state]);

  const reset = () => {
    setState('initial');
  };

  const start = () => {
    setState('in-progress');
  };

  const done = () => {
    const completionStates = ['initial', 'in-progress'];
    setState((state) => (completionStates.includes(state) ? 'completing' : state));
  };

  return { state, value: springInstance, start, done, reset };
};
