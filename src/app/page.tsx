import { Metadata } from 'next';
import { cn } from '@/utils';
import { UserBaseInfo } from '@/app/UserBaseInfo';
import { LastPosts } from '@/app/LastPosts';
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

export default function Home() {
  return (
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'm-auto',
        'sm:px-0 px-4',
        'sm:mt-5 mt-4',
        '*:mt-4'
      )}
    >
      {/* 基本信息 */}
      <UserBaseInfo />

      {/* 最新文章 */}
      <LastPosts />
    </div>
  );
}
