import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Routes
import { privateRoutes, publicRoutes } from '@routes';

// Components
import { CommonLayout } from '@layouts';

// Components
import { Authentication, ScrollToTop } from '@components';
import { AppDependenciesContext } from '@contexts';
import { APP_EVENTS, ROUTES } from '@constants';
import { LocalStoreHelper, SessionStoreHelper } from '@helpers';

export default function App() {
  const { eventEmitter } = useContext(AppDependenciesContext);
  const navigate = useNavigate();

  useEffect(() => {
    eventEmitter.on(APP_EVENTS.LOGOUT, async () => {
      // TODO: this is a temporary hack, will fix post MVP
      // await authService.logout();
      SessionStoreHelper.clear();
      LocalStoreHelper.clear();
      navigate(ROUTES.LOGIN);
    });
  }, []);

  return (
    <ScrollToTop>
      <Routes>
        <Route element={<CommonLayout />}>
          {/* This Route check that if user logged in, that can't access login url */}
          <Route element={<Authentication auth={false} />}>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          <Route element={<Authentication auth />}>
            {privateRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </ScrollToTop>
  );
}
