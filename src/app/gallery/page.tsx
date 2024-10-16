import { ImageWrap } from '@/components/ImageWrap';
import type { PictureRich } from '@/config/picture';
import { getAllPicture, metadataConfig } from '@/config/picture';
import { AGENT } from '@/middlewares/constant';
import type { ServerComponentProps } from '@/middlewares/interface';
import { cn } from '@/utils';

export const metadata = metadataConfig;

const GalleryDesktop = (props: { allPicture: PictureRich[] }) => {
  const { allPicture } = props;

  return (
    <div
      className={cn(
        'user-select-none mt-4',
        'screen-1560:w-[1560px]',
        'screen-1250:w-[1250px]',
        'screen-950:w-[932px]',
        'screen-630:w-[622px]'
      )}
    >
      <div className={cn('grid grid-cols-gallery auto-rows-[10px]')}>
        {allPicture.map((picture) => (
          <div
            className={cn('w-[300px] justify-self-center', 'row-auto')}
            style={{ gridRow: `span ${picture.photoSpan}` }}
            key={picture.src}
          >
            <div className={cn('w-full h-auto', 'overflow-hidden', 'rounded-sm')}>
              <ImageWrap
                className={cn(
                  'w-full',
                  'shadow-md',
                  'hover:scale-105',
                  'transition-all duration-700 ease-in-out',
                  'cursor-pointer'
                )}
                src={picture.src}
                alt={picture.alt}
                width={picture.width}
                height={picture.height}
                quality={100}
                sizes='300px'
                blurPlaceholder
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryMobile = (props: { allPicture: PictureRich[] }) => {
  const { allPicture } = props;

  return (
    <div className={cn('user-select-none mt-4')}>
      <div className={cn('w-screen')}>
        {allPicture.map((picture) => {
          return (
            <div
              className={cn('w-full  aspect-[16/9] px-3 pb-3')}
              style={{ aspectRatio: picture.widthHeightRatio }}
              key={picture.src}
            >
              <div
                className={cn(
                  'w-full h-full',
                  'shadow-md',
                  'rounded-sm',
                  'overflow-hidden',
                  'relative'
                )}
              >
                <ImageWrap
                  className={cn()}
                  src={picture.src}
                  alt={picture.alt}
                  fill
                  sizes='300px'
                  blurPlaceholder
                  quality={100}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default async function Gallery(props: ServerComponentProps) {
  console.log('🚀 ~ Gallery ~ props:', props);
  const { viewport } = props.searchParams;

  const allPicturePromise = await getAllPicture();
  const allPicture = await Promise.all(allPicturePromise.map(async (post) => post));

  return (
    <div className={cn('flex justify-center')}>
      {viewport === AGENT.MOBILE ? (
        <GalleryMobile allPicture={allPicture} />
      ) : (
        <GalleryDesktop allPicture={allPicture} />
      )}
    </div>
  );
}
