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
