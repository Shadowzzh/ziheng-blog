import { getImageDimensions } from '@/lib/image/getImageDimensions';
import type { Metadata } from 'next';

import { galleryConfig } from '@/config/picture/data';
import type { CoverPicture, PictureObject } from '@/config/picture/interface';

export { galleryConfig } from '@/config/picture/data';
export type {
  PictureAgent,
  PictureMetadata,
  PictureRich,
  CoverPicture
} from '@/config/picture/interface';

const metadataDecs = '相册';
const metadataTitle = '相册';

export const metadataConfig: Metadata = {
  title: metadataTitle,
  description: metadataDecs,
  openGraph: {
    title: metadataTitle,
    description: metadataDecs
  },
  twitter: {
    title: metadataTitle,
    description: metadataDecs,
    card: 'summary_large_image'
  }
};

const pictureObjectMap = new Map<string, PictureObject>(Object.entries(galleryConfig.data));

/** 生成图片的宽高信息 */
const getPictureRect = async (src: string) => {
  const metadata = await getImageDimensions(src);
  if (!metadata || !metadata.width || !metadata.height) return undefined;

  // 计算图片的宽高比
  const [heightWidthRatio, widthHeightRatio] = (() => {
    if (metadata.width && metadata.height) {
      return [metadata.height / metadata.width, metadata.width / metadata.height];
    }
    return [1, 1];
  })();

  // 计算图片的宽高
  const galleryHeight = Math.ceil(300 * heightWidthRatio);
  // 计算图片行的跨度
  const photoSpan = Math.ceil(galleryHeight / 10) + 1;

  return {
    metadata,
    photoSpan,
    width: 300,
    widthHeightRatio,
    heightWidthRatio,
    height: galleryHeight
  };
};

/** 获取所有图片 */
export const getAllCoverPicture = async () => {
  const allCoverPicture = [...pictureObjectMap].map(async ([, pictureObject]) => {
    const coverPicture = pictureObject.cover;
    const rectInfo = await getPictureRect(coverPicture);

    const result = {
      ...pictureObject,
      ...rectInfo
    } as CoverPicture;

    return result;
  });

  return allCoverPicture;
};
