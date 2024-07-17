import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 扁平化创建 Promise */
export const createPromise = <T>() => {
  let resolve, reject;

  const promise = new Promise<T>((r, j) => ((resolve = r), (reject = j)));

  return [
    promise,
    resolve as unknown as (value: T | PromiseLike<T>) => void,
    reject as unknown as (value: T | PromiseLike<T>) => void
  ] as const;
};

/** 判断元素是否为空 */
export const elementIsEmpty = (element?: HTMLElement) => {
  if (!element) return true;

  return (
    element.innerText.trim() === '' || element.innerText === undefined || element.offsetHeight === 0
  );
};

/** 获取数组最后一个元素 */
export const last = <T>(arr: T[]) => {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
};

/** 获取元素的 offsetTop */
export const getOffsetTopElement = (
  element: HTMLElement,
  container: HTMLElement = document.body
) => {
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement | null;

  while (current !== null && typeof current.offsetTop === 'number') {
    if (container && current === container) break;

    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return actualTop;
};
