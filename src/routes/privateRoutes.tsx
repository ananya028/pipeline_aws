import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES_AUTH } from '@constants';

// Components
import { SuspenseWrapper } from '@components';

const Projects = lazy(() => import('@pages').then((module) => ({ default: module.Projects })));
const Icon = lazy(() => import('@pages').then((module) => ({ default: module.Icon })));
const Logo = lazy(() => import('@pages').then((module) => ({ default: module.Logo })));
const Illustration = lazy(() =>
  import('@pages').then((module) => ({ default: module.Illustration }))
);
const Favicon = lazy(() => import('@pages').then((module) => ({ default: module.Favicon })));
const UploadFile = lazy(() => import('@pages').then((module) => ({ default: module.UploadFile })));
const Preview = lazy(() => import('@pages').then((module) => ({ default: module.Preview })));
const MakeItSmart = lazy(() =>
  import('@pages').then((module) => ({ default: module.MakeItSmart }))
);

export const privateRoutes: RouteObject[] = [
  {
    path: ROUTES_AUTH.PROJECTS,
    element: (
      <SuspenseWrapper>
        <Projects />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.LOGO,
    element: (
      <SuspenseWrapper>
        <Logo />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.ICON,
    element: (
      <SuspenseWrapper>
        <Icon />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.ILLUSTRATIONS,
    element: (
      <SuspenseWrapper>
        <Illustration />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.FAVICON,
    element: (
      <SuspenseWrapper>
        <Favicon />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.UPLOAD_FILE,
    element: (
      <SuspenseWrapper>
        <UploadFile />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.PREVIEW,
    element: (
      <SuspenseWrapper>
        <Preview />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES_AUTH.MAKE_IT_SMART,
    element: (
      <SuspenseWrapper>
        <MakeItSmart />
      </SuspenseWrapper>
    ),
  },
];
