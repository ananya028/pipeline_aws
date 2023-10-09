import { LoadingOverlay } from '@mantine/core';
import { ReactNode, Suspense } from 'react';

export const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <LoadingOverlay
        pos="fixed"
        loaderProps={{
          size: 'md',
          variant: 'oval',
        }}
        overlayOpacity={0.7}
        visible
      />
    }
  >
    {children}
  </Suspense>
);
