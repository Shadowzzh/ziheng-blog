'use client';

import { useReportWebVitals } from 'next/web-vitals';

export const WebVitals = () => {
  useReportWebVitals((metric) => {
    metric;
  });

  return <></>;
};
