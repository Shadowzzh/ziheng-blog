import { cn } from '@/utils';
import Image from 'next/image';
import Avatar from '@/assets/images/avatar.png';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { PiArticleNyTimesLight } from 'react-icons/pi';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { FaPhotoFilm } from 'react-icons/fa6';
import { allPosts } from 'contentlayer/generated';

const socialMediaItems = [
  {
    icon: FaGithub,
    name: 'Github',
    url: 'https://github.com/Shadowzzh'
  },
  {
    icon: FaSquareXTwitter,
    name: 'Twitter',
    url: 'https://x.com/zziheng_'
  }
];

const sectionItems = [
  {
    title: '文章',
    description: '文章列表',
    icon: PiArticleNyTimesLight,
    bg: 'bg-purple-100',
    color: 'text-purple-500'
  },
  {
    title: '项目',
    description: '开发的作品列表',
    icon: AiOutlineFundProjectionScreen,
    bg: 'bg-blue-100',
    color: 'text-blue-500'
  },
  {
    title: '相册',
    description: '我拍摄的照片',
    icon: FaPhotoFilm,
    bg: 'bg-yellow-100',
    color: 'text-yellow-500'
  },
  {
    title: '关于我',
    description: '正在开发中...',
    icon: LiaUserFriendsSolid,
    bg: 'bg-green-100',
    color: 'text-green-500'
  }
];

const lastPosts = allPosts
  .sort((a, b) => {
    const dateA = new Date(a.date ?? '2000').getTime();
    const dateB = new Date(b.date ?? '2000').getTime();

    return dateA - dateB;
  })
  .slice(0, 3);

export default function Home() {
  return (
    <div
      className={cn(
        '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
        'm-auto',
        'px-8',
        'mt-5',
        '*:mt-4'
      )}
    >
      {/* 基本信息 */}
      <div
        className={cn(
          'p-4 font-title sm:flex-row sm:p-8',
          'flex justify-between items-center',
          'shadow-sm rounded-lg',
          'bg-white'
        )}
      >
        <div>
          <div className={cn('text-2xl font-bold')}>张子恒</div>
          <div className={cn('mt-2 mb-4', ' text-neutral-600')}>
            👨‍💻 前端开发 | 💪 健身爱好者 | 📸 摄影达人 | 🌍 旅行徒步爱好者 <br />
            把代码写得像艺术，把自己练得像雕塑，把世界拍得像明信片，把生活过得像冒险！
          </div>

          <div className={cn('space-x-2', 'flex')}>
            {socialMediaItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  title={item.name}
                  className={cn(
                    'cursor-pointer',
                    'rounded-md',
                    'bg-neutral-50',
                    'px-3 py-2',
                    'flex justify-center items-center'
                  )}
                  key={index}
                  href={item.url}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Icon className='size-5' />
                </Link>
              );
            })}
          </div>
        </div>

        <div className={cn('flex-shrink-0')}>
          <Image
            className={cn('rounded-full lg:size-24 mini:size-20 size-14', 'object-cover')}
            quality={75}
            src={Avatar}
            alt='avatar'
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* 导航卡片 */}
      <div className={cn('grid gap-4 xl:grid-cols-4 md:grid-cols-3 mini:grid-cols-2  grid-cols-1')}>
        {sectionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={cn('p-4', 'shadow-sm rounded-lg', 'flex flex-col', 'bg-white')}
            >
              <Icon className={cn('size-8', 'p-1 rounded-sm', item.bg, item.color)} />
              <div className={cn('text-lg font-bold mt-3 mb-1')}>{item.title}</div>
              <div className={cn('text-sm')}>{item.description}</div>
            </div>
          );
        })}
      </div>

      {/* 最新文章 */}
      <div
        className={cn(
          'p-4',
          'shadow-sm rounded-lg',
          'bg-white',
          'space-y-3',
          'cursor-pointer',
          'mb-4'
        )}
      >
        {lastPosts.map((post, index) => {
          return (
            <Link key={index} href={`${post.slug}`}>
              <div key={index} className={cn('p-3', 'hover:bg-neutral-50', 'rounded-md')}>
                <div className={cn('text-xl font-bold')}>{post.title}</div>
                <div className={cn('text-sm mt-1 text-neutral-600')}>{post.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
