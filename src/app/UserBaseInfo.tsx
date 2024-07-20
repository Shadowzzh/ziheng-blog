import type { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { TbExternalLink } from 'react-icons/tb';

import { cn } from '@/utils';
import Avatar from '@/assets/images/avatar.png';
import { buttonVariants } from '@/components/ui/button';
import lottiesGithub from '@/assets/lotties/github.json';
import lottiesTwitter from '@/assets/lotties/twitter.json';
import { LottieWrap } from '@/components/LottieWrap';
import { CopyText } from '@/components/ClientCopyText';

const socialMediaItems = [
  {
    icon: FaGithub,
    name: 'Github',
    url: 'https://github.com/Shadowzzh',
    json: lottiesGithub
  },
  {
    icon: FaSquareXTwitter,
    name: 'Twitter',
    url: 'https://x.com/zziheng_',
    json: lottiesTwitter
  }
];

/** 用户基本信息 */
export const UserBaseInfo = (props: ComponentProps<'div'>) => {
  return (
    <div className={cn('sm:text-base text-sm', props.className)}>
      <div
        className={cn(
          ' outline-muted-foreground/90 outline-2 outline',
          'dark:p-1 p-[0.2rem]',
          'sm:size-20 size-16',
          'sm:rounded-md rounded-sm',
          `transition-all duration-1000 ease-in-out`
        )}
      >
        <Image
          className={cn(
            'object-cover',
            'w-full h-full',
            'sm:rounded-md rounded-sm',
            `transition-all duration-1000 ease-in-out`
          )}
          quality={50}
          src={Avatar}
          alt='avatar'
          width={100}
          height={100}
          sizes='100px'
          priority
        />
      </div>
      <div className={cn('space-y-3 md:pt-8 pt-6')}>
        <p className={'text-lg'}>张子恒</p>
        <p>我是一名来自杭州的前端开发工程师。</p>
        <p>目前在杭州从事前端开发工作。</p>
        <div className={cn('inline-block', 'break-all')}>
          你可以通过
          <CopyText
            className={cn(
              buttonVariants({ variant: 'link', size: 'auto' }),
              'text-xs',
              'cursor-pointer'
            )}
            text='wx:zzh1746556951'
          >
            wx:zzh1746556951
          </CopyText>
          、
          <Link
            href={'mailto:shadow1746556951@gmail.com'}
            target='_blank'
            className={cn(buttonVariants({ variant: 'link', size: 'auto' }))}
          >
            shadow1746556951@gmail
            <TbExternalLink className='sm:size-4 size-3 ml-1' />
          </Link>
          <br />
          或以下方式联系我。
        </div>
      </div>

      <div className={cn('space-x-2', 'mt-5', 'flex')}>
        {socialMediaItems.map((item, index) => {
          return (
            <Link title={item.name} key={index} href={item.url} target='_blank' rel='noreferrer'>
              <LottieWrap
                className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'p-2')}
                mode='hover'
                animationData={item.json}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
