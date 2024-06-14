'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils';

const NotFound = () => {
  const router = useRouter();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center text-center'>
      <h2 className='text-6xl font-medium lg:text-[7.5rem]'>404</h2>
      <p className='mb-8 text-xl lg:text-2xl'>Page not found.</p>
      <div className='flex *:mx-1'>
        <Link href='/' className={cn()}>
          <button>首页</button>
        </Link>

        <button onClick={() => router.back()}>上一页</button>
      </div>
    </main>
  );
};

export default NotFound;
