import sharp from 'sharp';
import path from 'path';

/**
 * 获取图片的 Metadata 信息
 * @param imagePath 图片路径
 * @returns 图片的 Metadata 信息
 */
export async function getImageDimensions(imagePath?: string) {
  if (!imagePath) return undefined;

  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const metadata = await sharp(fullPath).metadata();

  const width = [5, 6, 7, 8].includes(metadata.orientation ?? 1) ? metadata.height : metadata.width;

  const height = [5, 6, 7, 8].includes(metadata.orientation ?? 1)
    ? metadata.width
    : metadata.height;

  return {
    ...metadata,
    width,
    height
  };
}
