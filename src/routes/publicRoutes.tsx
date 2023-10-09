import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
import { ForgotPassword, ResetPassword } from '@pages';
import { SuspenseWrapper } from '@components';

const Login = lazy(() => import('@pages').then((module) => ({ default: module.Login })));
// const SignUp = lazy(() => import('@pages').then((module) => ({ default: module.SignUp })));
// const ForgotPassword = lazy(() =>
//   import('@pages').then((module) => ({ default: module.ForgotPassword }))
// );
// const ResetPassword = lazy(() =>
//   import('@pages').then((module) => ({ default: module.ResetPassword }))
// );

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.BASE,
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  // {
  //   path: ROUTES.SIGN_UP,
  //   element: (
  //     <SuspenseWrapper>
  //       <SignUp />
  //     </SuspenseWrapper>
  //   ),
  // },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <SuspenseWrapper>
        <ForgotPassword />
      </SuspenseWrapper>
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: (
      <SuspenseWrapper>
        <ResetPassword />
      </SuspenseWrapper>
    ),
  },
];
