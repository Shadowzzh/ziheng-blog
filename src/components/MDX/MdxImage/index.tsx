'use server';

import type { ImageProps } from 'next/image';
import { dynamicBlurDataUrl } from '@/lib/image/dynamicBlurDataUrl';
import { PreviewImage } from './PreviewImage'

interface MdxImageProps extends ImageProps {}

export const MdxImage = async (props: MdxImageProps) => {
  // 获取图片的模糊数据
  const blurDataURL = await (async () => {
    if (typeof props.src === 'string') {
      return await dynamicBlurDataUrl(props.src);
    }
    return undefined;
  })();

  return (
    <div className='relative'>
      <PreviewImage blurDataURL={blurDataURL} {...props} />
    </div>
  );
};
