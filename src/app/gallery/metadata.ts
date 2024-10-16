import type { Metadata } from 'next';

const metadataDecs = '相册';
const metadataTitle = '相册';

export const metadataConfig: Metadata = {
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
