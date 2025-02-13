import type { Metadata } from 'next';

import { cn } from '@/utils';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { ImageWrap } from '@/components/ImageWrap';
import Link from 'next/link';

const metadataDecs = '个人简介';
const metadataTitle = '个人简介';
export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDecs,
  openGraph: {
    title: metadataTitle,
    description: metadataDecs
  },
  twitter: {
    title: metadataTitle,
    description: metadataDecs,
    card: 'summary_large_image'
  }
};

const words = [
  {
    text: 'console.log("'
  },
  {
    text: 'Hello, World!',
    className: 'text-neutral-500 dark:text-neutral-500'
  },
  {
    text: '");'
  }
];

export default async function About() {
  return (
    <>
      <div className={cn('max-w-[550px]', 'sm:px-0 px-4', 'm-auto')}>
        <TypewriterEffect words={words} className={cn('md:!text-3xl !text-xl', ' md:my-10 my-5')} />
      </div>

      <div className=' px-5'>
        <div
          className={cn(
            'm-auto',
            'md:w-[550px] w-full md:h-60 h-48',
            'relative',
            'flex flex-col items-center justify-center'
          )}
        >
          <ImageWrap
            className={cn('rounded-sm m-auto', 'object-cover')}
            src='/about/coding.gif'
            alt='coding'
            fill
            sizes='100vw'
            blurPlaceholder
            priority
          />
        </div>
      </div>

      <div className={cn('max-w-[550px]', 'sm:px-0 px-4', 'm-auto')}>
        <div className={cn('mt-6')}>
          {/* <h1 className={cn('text-base md:text-lg mt-5 mb-4')}>你好！很高兴认识你！</h1>
          <div className={cn('text-sm md:text-base mb-5')}>
            这个博客出于个人兴趣做的。我喜欢写代码，想试试看能不能做出点属于自己的东西。顺便也能展示一下我所学的技能。
          </div> */}
          <h1 className='text-xl font-bold mb-2'>关于网站</h1>
          <div>
            平时我喜欢写代码和搞创意，想试试看能不能做点自己喜欢的东西，同时也展示一下我学到的技能。
          </div>
          {/* <ul className={cn('text-sm md:text-base space-y-3')}>
            <li>👀 &nbsp; 我是一名前端开发者，目前在杭州从事前端开发工作。</li>
            <li>💞️ &nbsp; 我使用的技术：TS、React、Vue、NodeJS、NextJS。</li>
            <li>📚 &nbsp; 我正在学习：Web3、NextJS。</li>
          </ul> */}
          <h1 className='text-xl font-bold mb-2 mt-6'>在线简历</h1>
          <Link
            target='_blank'
            href='https://rxresu.me/shadow1746556951/front-end-development-engineer-zhangziheng'
            className='text-blue-500 hover:text-blue-600'
          >
            Rxresu 简历
          </Link>
        </div>
      </div>
    </>
  );
}
