import type { Metadata } from 'next';

import Image from 'next/image';
import { TbExternalLink } from 'react-icons/tb';

import { cn } from '@/utils';
import Coding from '@/assets/images/coding.gif';
import { LinkWrap } from '@/components';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

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
    className: 'text-blue-500 dark:text-blue-500'
  },
  {
    text: '");'
  }
];

export default async function About() {
  return (
    <>
      <div
        className={cn(
          '2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl',
          'sm:px-0 px-4',
          'm-auto'
        )}
      >
        <TypewriterEffect
          words={words}
          className={cn('md:!text-3xl !text-2xl', ' md:my-10 my-5')}
        />

        <div className={cn('flex flex-col items-center justify-center')}>
          <Image
            className={cn('rounded-sm m-auto')}
            src={Coding}
            alt='coding'
            width={500}
            sizes='100vw'
            priority
          />
          <LinkWrap
            className={cn('text-xs text-muted-foreground opacity-50 mt-3 mb-2', ' inline-flex')}
            href='https://tenor.com/view/coding-gif-18657810'
            target='_blank'
          >
            https://tenor.com/view/coding-gif-18657810
            <TbExternalLink className={cn('size-4 ml-1')} />
          </LinkWrap>
          <span className={cn('text-lg')}>I love ep (computer programming)</span>
        </div>

        <div className={cn('')}>
          <h1 className={cn('text-base md:text-lg mt-5 mb-4')}>你好！很高兴认识你！</h1>
          <ul className={cn('text-sm md:text-base space-y-3')}>
            <li>👋 &nbsp; 你好，我是张子恒。</li>
            <li>👀 &nbsp; 我是一名前端开发者，目前在政采云外包工作。</li>
            <li>💞️ &nbsp; 我使用的技术：TS、React、Vue、Node、Next</li>
            <li>📚 &nbsp; 我正在学习：Web3、Next</li>
            <li>📫 &nbsp; 如何联系我？邮箱：shadow1746556951@gmail.com</li>
          </ul>
        </div>
      </div>
    </>
  );
}
