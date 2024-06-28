import { cn } from '@/utils';
import { UserBaseInfo } from '@/components/Page/UserBaseInfo';
import { LastPosts } from '@/components/Page/LastPosts';
import { Metadata } from 'next';
import { WEB_SITE_NAME, WEB_SITE_URL } from '@/config/name';

export const metadata: Metadata = {
  metadataBase: new URL(WEB_SITE_URL),
  title: {
    default: WEB_SITE_NAME,
    template: `%s | ${WEB_SITE_NAME}`
  },
  description: '张子恒的博客',
  openGraph: {
    title: '张子恒的博客',
    url: WEB_SITE_URL,
    description: '前端开发者',
    siteName: WEB_SITE_NAME,
    images: [
      {
        url: `${WEB_SITE_URL}/logo.png`, // Must be an absolute URL
        width: 300,
        height: 300
      }
    ],
    locale: 'zh-CN',
    type: 'website'
  }
};

// const sectionItems = [
//   {
//     title: '文章',
//     description: '文章列表',
//     icon: PiArticleNyTimesLight,
//     bg: 'bg-purple-100',
//     color: 'text-purple-500'
//   },
//   {
//     title: '项目',
//     description: '开发的作品列表',
//     icon: AiOutlineFundProjectionScreen,
//     bg: 'bg-blue-100',
//     color: 'text-blue-500'
//   },
//   {
//     title: '相册',
//     description: '我拍摄的照片',
//     icon: FaPhotoFilm,
//     bg: 'bg-yellow-100',
//     color: 'text-yellow-500'
//   },
//   {
//     title: '关于我',
//     description: '正在开发中...',
//     icon: LiaUserFriendsSolid,
//     bg: 'bg-green-100',
//     color: 'text-green-500'
//   }
// ];

export default function Home() {
  return (
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'm-auto',
        'sm:px-8 px-4',
        'sm:mt-5 mt-4',
        '*:mt-4'
      )}
    >
      {/* 基本信息 */}
      <UserBaseInfo />

      {/* 导航卡片 */}
      {/* <div className={cn('grid gap-4 xl:grid-cols-4  sm:grid-cols-3  grid-cols-1')}>
        {sectionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={cn('p-4', 'shadow-sm rounded-lg', 'flex flex-col', 'bg-white')}
            >
              <div
                className={cn(
                  'flex sm:flex-col flex-row sm:items-start items-center ',
                  'sm:mb-0 mb-3'
                )}
              >
                <Icon
                  className={cn('size-8', 'p-1 rounded-sm', 'sm:nr-0 mr-3', item.bg, item.color)}
                />
                <div className={cn('text-lg font-bold sm:mt-3 mt-0 sm:mb-1 mb-0')}>
                  {item.title}
                </div>
              </div>
              <div className={cn('text-sm')}>{item.description}</div>
            </div>
          );
        })}
      </div> */}

      {/* 最新文章 */}
      <LastPosts />
    </div>
  );
}
