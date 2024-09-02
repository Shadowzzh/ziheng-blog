'use server';

import type { ImageProps } from 'next/image';

import { PreviewImage } from './PreviewImage';
import { ServerGenBlurDataURL } from '@/components/ImageWrap';

interface MdxImageProps extends ImageProps {}

export const MdxImage = async (props: MdxImageProps) => {
  return ServerGenBlurDataURL({
    src: props.src,
    children: (params) => <PreviewImage blurDataURL={params.blurDataURL} {...props} />
  });
};
