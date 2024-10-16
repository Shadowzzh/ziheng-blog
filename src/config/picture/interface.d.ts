/** 图片原数据 */
export interface PictureMetadata {
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

export interface PictureAgent {
  /** 图片行跨度 */
  photoSpan: number;
  /** 图片宽度 */
  width: number;
  /** 图片高度 */
  height: number;
  /** 图片宽度高度比 */
  widthHeightRatio: number;
}

/** 图片信息  */
export type PictureRich = PictureMetadata & PictureAgent;

/** 图片对象 */
export type PictureObject = {
  title: string;
  description: string;
  cover: string;
  id: string;
  list: PictureMetadata[];
};

export type CoverPicture = PictureObject &
  PictureAgent & {
    metadata: SharpMetadata;
  };

/** 相册配置 */
interface GalleryConfig {
  title: string;
  description: string;
  data: {
    [key: string]: PictureObject;
  };
}
