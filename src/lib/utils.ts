import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 排除一个对象的某些键和值
 * @param target 目标对象
 * @param omitKeys 排除的对象的键的数组
 */
export function omit<T, K extends keyof T>(target: T, omitKeys: K[]): Omit<T, K> {
  const ret = { ...target };
  omitKeys.forEach((key) => {
    delete ret[key];
  });
  return ret;
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

/** 解析 html 属性 */
export const parseHtmlAttributes = <T extends Record<string, string> = Record<string, string>>(
  attributeString: string
): T => {
  // 去掉空格，去掉引号，去掉换行符;转成数组
  const formattedAttrs = attributeString
    .trim()
    .replace(/['"{}]/g, '')
    .split('\n');

  const result = formattedAttrs.reduce(
    (acc, attr) => {
      const [key, value] = attr.trim().split('=');

      if (key && value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return result as T;
};
