import { getImageDimensions } from '@/lib/image/getImageDimensions';
import type { Metadata as SharpMetadata } from 'sharp';
import type { Metadata } from 'next';

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

/** 图片信息 */
interface Picture {
  /** 图片路径 */
  src: string;
  /** 图片分类 */
  categories: string[];
  /** 图片日期 */
  date: string;
  /** 图片描述 */
  alt: string;
  /** 图片参数 */
  params?: Record<string, string>;
}

interface GalleryConfig {
  title: string;
  description: string;
  data: {
    [key: string]: Picture[];
  };
}

/** 相册配置 */
export const galleryConfig: GalleryConfig = {
  title: '相册',
  description: '相册',
  data: {
    '201910': [
      {
        src: '/gallery/201910/201910_0.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_1.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_2.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      // {
      //   src: '/gallery/201910/201910_3.webp',
      //   categories: ['nature'],
      //   date: '2019-10-15',
      //   alt: 'Beautiful landscape'
      // },
      // {
      //   src: '/gallery/201910/201910_4.webp',
      //   categories: ['nature'],
      //   date: '2019-10-15',
      //   alt: 'Beautiful landscape'
      // },
      {
        src: '/gallery/201910/201910_5.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_6.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_7.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_8.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_9.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_10.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_11.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_12.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_13.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_14.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_15.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_16.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_17.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_18.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_19.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_20.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_21.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_22.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_23.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_24.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_25.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_26.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_27.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_28.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_29.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_30.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_31.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_32.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_33.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_34.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_35.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      },
      {
        src: '/gallery/201910/201910_36.webp',
        categories: ['nature'],
        date: '2019-10-15',
        alt: 'Beautiful landscape'
      }
    ]
  }
};

/** 获取所有图片 */
export const getAllPicture = async () => {
  const allPicture = Object.values(galleryConfig.data).flat();

  const allPictureWiteMetadata = allPicture.map(async (picture) => {
    const metadata = await getImageDimensions(picture.src);
    if (!metadata || !metadata.width || !metadata.height) return undefined;

    // 计算图片的宽高比
    const widthHeightRatio = (() => {
      if (metadata.width && metadata.height) {
        return metadata.height / metadata.width;
      }
      return 1;
    })();

    // 计算图片的宽高
    const galleryHeight = Math.ceil(300 * widthHeightRatio);
    // 计算图片行的跨度
    const photoSpan = Math.ceil(galleryHeight / 10) + 1;

    const result = {
      metadata,
      ...picture,
      photoSpan,
      width: 300,
      height: galleryHeight
    };

    return result;
  });

  const result = await allPictureWiteMetadata.filter((picture) => picture !== undefined);
  return result as unknown as (Picture & {
    metadata: SharpMetadata;
    photoSpan: number;
    width: number;
    height: number;
  })[];
};
