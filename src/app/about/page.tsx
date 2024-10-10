import type { Metadata } from 'next';

import { cn } from '@/utils';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { ImageWrap } from '@/components/ImageWrap';

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
        <TypewriterEffect
          words={words}
          className={cn('md:!text-3xl !text-2xl', ' md:my-10 my-5')}
        />
      </div>

      <div
        className={cn(
          'm-auto',
          'w-[550px] h-60',
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

      <div className={cn('max-w-[550px]', 'sm:px-0 px-4', 'm-auto')}>
        <div className={cn('')}>
          <h1 className={cn('text-base md:text-lg mt-5 mb-4')}>你好！很高兴认识你！</h1>
          <ul className={cn('text-sm md:text-base space-y-3')}>
            <li>👀 &nbsp; 我是一名前端开发者，目前在杭州从事前端开发工作。</li>
            <li>💞️ &nbsp; 我使用的技术：TS、React、Vue、NodeJS、NextJS。</li>
            <li>📚 &nbsp; 我正在学习：Web3、NextJS。</li>
          </ul>
        </div>
      </div>
    </>
  );
}
