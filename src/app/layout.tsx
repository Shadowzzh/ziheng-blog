import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutHeader } from '@/components/Layout/Header';
import { cn } from '@/utils';
import { LayoutFooter } from '@/components/Layout/Footer';
import { ProgressBar } from '@/components/ProgressBar';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en'>
      <body className={cn(inter.className, 'bg-neutral-100')}>
        <ProgressBar className='fixed top-0 h-[0.1rem] bg-neutral-500 z-[100]'>
          <LayoutHeader />

          <main className={cn(' min-h-screen')}>{children}</main>
          <LayoutFooter />
        </ProgressBar>
      </body>
    </html>
  );
}
