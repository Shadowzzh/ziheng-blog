'only server';

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 根据 url 图片生成  blurDataURL
 *
 * @description
 *
 * 代码来源：https://medium.com/@kavindumadushanka972/learn-how-to-create-dynamic-blur-data-urls-for-images-in-next-js-bc4eb5d04ec6
 *
 * blurDataUrl： {@link https://nextjs.org/docs/app/api-reference/components/image#blurdataurl} */
export const dynamicBlurDataUrl = async (url?: string) => {
  if (!url) return '';

  // 获取图片绝对路径
  const absoluteUrl = path.join(`${process.cwd()}/public`, url);
  const file = await fs.readFile(absoluteUrl); // 读取文件

  // 使用 sharp 生成缩略图
  const bufferUrl = await sharp(file).resize(10).toBuffer();
  const base64str = bufferUrl.toString('base64'); // 转换为 base64

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`;
};
