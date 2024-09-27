import { Suspense, type ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiWechat2Line } from '@react-icons/all-files/ri/RiWechat2Line';
import { HiOutlineMail } from '@react-icons/all-files/hi/HiOutlineMail';

import { cn } from '@/utils';
import Avatar from '@/assets/images/avatar.png';
import { buttonVariants } from '@/components/ui/button';
import lottiesGithub from '@/assets/lotties/github.json';
import lottiesTwitter from '@/assets/lotties/twitter.json';
import { LottieWrap } from '@/components/LottieWrap';
import { ClientOnly } from '@/components/ClientOnly';
import { Skeleton } from '@/components/ui/skeleton';
import { CopyText } from '@/components/ClientCopyText';

const socialMediaItems = [
  {
    name: 'Github',
    url: 'https://github.com/Shadowzzh',
    json: lottiesGithub
  },
  {
    name: 'Twitter',
    url: 'https://x.com/zziheng_',
    json: lottiesTwitter
  }
];

/** 用户基本信息 */
export const UserBaseInfo = async (props: ComponentProps<'div'>) => {
  return (
    <div className={cn('sm:text-base text-sm', props.className)}>
      <div
        className={cn(
          'outline-muted-foreground/40 outline-1 outline',
          'dark:p-1 p-[0.2rem]',
          'sm:size-20 size-16',
          'sm:rounded-md rounded-sm',
          'bg-neutral-100 dark:bg-transparent'
        )}
      >
        <Image
          className={cn(
            'object-cover',
            'w-full h-full ',
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
        {/* <p className={'text-lg'}>张子恒</p> */}
        <p>我对产品、技术、运动等方面充满兴趣，乐于运用代码技能来实现自己的想法。</p>
        <p>热爱徒步和大自然，喜欢运动健身。</p>
        <p>目前在杭州从事前端开发工作。</p>
        <p>欢迎联系我，一起交流技术、产品、运动健身等方面的话题。</p>
      </div>

      <div className={cn('space-x-2', 'mt-5', 'flex')}>
        {socialMediaItems.map((item, index) => {
          return (
            <Link
              className='flex'
              title={item.name}
              key={index}
              href={item.url}
              target='_blank'
              rel='noreferrer'
            >
              <div className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                <Suspense>
                  <ClientOnly callback={<Skeleton className='size-5 rounded-sm' />}>
                    <LottieWrap className='p-2' mode='hover' animationData={item.json} />
                  </ClientOnly>
                </Suspense>
              </div>
            </Link>
          );
        })}

        {/* 邮箱 */}
        <Link
          className={cn(
            buttonVariants({ variant: 'outline', size: 'icon' }),
            'cursor-pointer',
            'select-none'
          )}
          href='mailto:shadow1746556951@gmail.com'
          title='Google Email'
          target='_blank'
        >
          <CopyText text='shadow1746556951@gmail.com' showToast={true}>
            <HiOutlineMail className='size-4' />
          </CopyText>
        </Link>

        {/* 微信 */}
        <CopyText
          className={cn(
            buttonVariants({ variant: 'outline', size: 'icon' }),
            'cursor-pointer',
            'select-none'
          )}
          text='wx:zzh1746556951'
          showToast={true}
        >
          <RiWechat2Line className='size-4' />
        </CopyText>
      </div>
    </div>
  );
};
