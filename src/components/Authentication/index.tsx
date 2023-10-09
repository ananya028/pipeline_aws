import { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { Navigate, Outlet } from 'react-router-dom';

// Constants
import { ROUTES, ROUTES_AUTH } from '@constants';

// Contexts
import { AuthenticationContext } from '@contexts';

export const Authentication = ({ auth }: { auth: boolean }) => {
  const { isAuthenticated, isInitialized } = useContext(AuthenticationContext);

  if (!isInitialized) {
    return (
      <LoadingOverlay
        pos="fixed"
        loaderProps={{
          size: 'md',
          variant: 'oval',
        }}
        overlayOpacity={0.7}
        visible
      />
    );
  }

  return (
    <>
      {auth ? (
        isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to={ROUTES.LOGIN} replace />
        )
      ) : isAuthenticated ? (
        <Navigate to={ROUTES_AUTH.PROJECTS} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};
