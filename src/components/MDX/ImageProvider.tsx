'use client';

import { PhotoProvider } from 'react-photo-view';

export const ImageProvider = (props: { children: React.ReactNode }) => {
  return <PhotoProvider>{props.children}</PhotoProvider>;
};
