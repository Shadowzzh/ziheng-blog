import { cn } from '@/utils';
import Image from 'next/image';
import Avatar from '@/assets/images/avatar.png';

import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

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

/** 用户基本信息 */
export const UserBaseInfo = () => {
  return (
    <div
      className={cn(
        'p-4 font-title sm:flex-row sm:p-8',
        'shadow-sm rounded-lg bg-card',
        'border border-border/70',
        'text-card-foreground'
      )}
    >
      <div className={cn('flex sm:flex-row flex-col-reverse justify-between  items-center')}>
        <div className={cn()}>
          <div className={cn('text-xl sm:text-2xl font-bold text-center sm:text-left')}>张子恒</div>
          <div
            className={cn('mt-4 mb-6', 'text-muted-foreground', 'mr-4', 'sm:text-base text-sm ')}
          >
            👨‍💻 前端开发 | 💪 健身爱好者 | 📸 摄影 | 🌍 旅行徒步爱好者 <br />
          </div>

          <div className={cn('space-x-2', 'flex')}>
            {socialMediaItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  title={item.name}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
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
            className={cn(
              'rounded-full lg:size-24 mini:size-20 size-14',
              'object-cover',
              'sm:mb-0 mb-3'
            )}
            quality={75}
            src={Avatar}
            alt='avatar'
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};
