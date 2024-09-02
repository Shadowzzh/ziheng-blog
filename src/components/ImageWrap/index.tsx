'use server';

import type { ImageProps } from 'next/image';
import { dynamicBlurDataUrl } from '@/lib/image/dynamicBlurDataUrl';
import Image from 'next/image';
import omit from 'lodash/omit';

interface MdxImageProps extends ImageProps {
  /** 是否使用模糊占位符 */
  blurPlaceholder?: boolean;
}

/**
 * 生成图片的模糊数据
 * @param src 图片的 src
 * @returns 图片的模糊数据
 */
const generatorBlurDataURL = (src?: MdxImageProps['src']) => {
  if (typeof src === 'string') {
    return dynamicBlurDataUrl(src);
  }
  return undefined;
};

/**  */
export const ImageWrap = async (props: MdxImageProps) => {
  const blurOption = await (async () => {
    if (props.blurPlaceholder) {
      return {
        // 获取图片的模糊数据
        blurDataURL: await generatorBlurDataURL(props.src),
        placeholder: 'blur' as ImageProps['placeholder']
      };
    }
    return {};
  })();

  const imageProps = omit(props, ['blurPlaceholder']);

  return <Image {...blurOption} {...imageProps} />;
};

/**
 * 服务端生成图片的模糊数据
 * @param props
 * @returns
 */
export const ServerGenBlurDataURL = async (props: {
  src: MdxImageProps['src'];
  children: (props: { blurDataURL?: string }) => React.ReactNode;
}) => {
  const { children } = props;

  const blurDataURL = await generatorBlurDataURL(props.src);

  return children({ blurDataURL });
};
