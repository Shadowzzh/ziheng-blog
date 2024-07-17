import type { Metadata } from 'next';
import type React from 'react';

import { LayoutHeader } from '@/app/Header';
import { cn } from '@/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import { inter } from '@/config/font';
import { routerMapping } from '@/config/routerMapping';

import { LayoutBreadcrumb } from './Breadcrumb';
import { ProgressBar } from './ProgressBar';

import './globals.css';
import { WebVitals } from '@/components/WebVitals';
import { LayoutHeaderExtra } from './HeaderExtra';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning={true}>
      <WebVitals />

      <body className={cn('ext-slate-500 dark:text-slate-400', 'antialiased t bg-background')}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <ProgressBar className='fixed top-0 h-[0.1rem] dark:bg-neutral-500 bg-neutral-700 z-[999]' />

          <div
            id='layout-header'
            className={cn('w-screen', 'backdrop-blur-md', 'bg-background/80', 'sticky z-10 top-0')}
          >
            <LayoutHeader className={cn('sm:h-16 h-12')} />
            <LayoutBreadcrumb className={cn('w-screen h-12 ')} routerMapping={routerMapping} />
            <LayoutHeaderExtra className={cn()} />
          </div>

          <main className={cn('min-h-screen')}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
