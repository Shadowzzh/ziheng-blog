import { ImageWrap } from '@/components/ImageWrap';
import { getAllPicture, metadataConfig } from '@/config/picture';
import { cn } from '@/utils';

export const metadata = metadataConfig;

export default async function Gallery() {
  const allPicturePromise = await getAllPicture();
  const allPicture = await Promise.all(allPicturePromise.map(async (post) => post));

  return (
    <div className={cn('flex justify-center')}>
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
                  sizes='300px'
                  blurPlaceholder
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
