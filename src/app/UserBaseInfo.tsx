import { Suspense, type ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiWechat2Line } from '@react-icons/all-files/ri/RiWechat2Line';

import { cn } from '@/utils';
import Avatar from '@/assets/images/avatar.png';
import { buttonVariants } from '@/components/ui/button';
import lottiesGithub from '@/assets/lotties/github.json';
import lottiesTwitter from '@/assets/lotties/twitter.json';
import lottiesMail from '@/assets/lotties/mail.json';
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
  },
  {
    name: 'Mail',
    url: 'mailto:shadow1746556951@gmail.com',
    copyText: 'shadow1746556951@gmail.com',
    loop: false,
    json: lottiesMail
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
      <div className={cn('space-y-3 md:pt-8 pt-6', 'leading-relaxed')}>
        <p>我是一名软件工程师，对产品、技术和运动等领域充满热情。</p>
        <p>
          我热衷于构建各种工具，以提升效率和体验，让生活变得更“高效”而又轻松。
          <br />
          喜欢徒步、亲近大自然，也爱好运动健身。
        </p>
        <p>
          目前，我在杭州从事前端开发工作。
          <br />
          如果你对技术、产品或运动健身等话题感兴趣，欢迎随时联系，共同交流分享。
        </p>
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
                    {item.name === 'Mail' ? (
                      <CopyText text={item.copyText} showToast={true}>
                        <LottieWrap
                          className='p-2'
                          mode='hover'
                          animationData={item.json}
                          loop={item.loop}
                        />
                      </CopyText>
                    ) : (
                      <LottieWrap className='p-2' mode='hover' animationData={item.json} />
                    )}
                  </ClientOnly>
                </Suspense>
              </div>
            </Link>
          );
        })}

        {/* 微信 */}
        <div title='微信'>
          <CopyText
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'cursor-pointer',
              'select-none',
              'group'
            )}
            text='wx:zzh1746556951'
            showToast={true}
          >
            <RiWechat2Line className={cn('size-4', 'group-hover:animate-wiggle')} />
          </CopyText>
        </div>
      </div>
    </div>
  );
};
