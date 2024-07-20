'use client';

import * as React from 'react';

export function ClientOnly({
  children,
  callback
}: {
  children: React.ReactNode;
  callback?: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return callback ?? null;

  return children;
}
