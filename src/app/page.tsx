import type { Metadata } from 'next';
import { cn } from '@/utils';
import { UserBaseInfo } from '@/app/UserBaseInfo';
import { WEB_SITE_NAME, WEB_SITE_URL } from '@/config/name';
import { LastPosts } from './LastPosts';

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
    <div className={cn('sm:p-8 p-4 sm:pt-32 pt-10')}>
      <div className={cn('max-w-[550px]', 'm-auto', 'divide-dashed divide-y ')}>
        {/* 基本信息 */}
        <UserBaseInfo className='pl-3 sm:pb-14 pb-10' />
        {/* 最新文章 */}
        <LastPosts className='sm:pt-14 pt-10' />
      </div>
    </div>
  );
}
