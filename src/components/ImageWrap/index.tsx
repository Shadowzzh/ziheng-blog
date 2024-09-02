'use server';

import type { ImageProps } from 'next/image';
import { dynamicBlurDataUrl } from '@/lib/image/dynamicBlurDataUrl';
import omit from 'lodash/omit';
import { ClientImageWrap } from './Client';

export interface MdxImageProps extends ImageProps {
  /** 是否使用模糊占位符 */
  blurPlaceholder?: boolean;
  /** 是否使用视差效果 */
  parallax?: boolean;
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

/**
 * 服务端渲染的 ImageWrap 组件
 * @param props - 组件的 props
 * @returns 渲染的 ImageWrap 组件
 */
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

  return <ClientImageWrap {...blurOption} {...imageProps} />;
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
