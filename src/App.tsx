import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { errorBoundaryHelper } from './utils/helpers/errorBoundary.helper';
import ErrorFallbackComponent from './utils/components/ErrorFallbackComponent';
import Loader from './shared-resources/components/Loader/Loader';
import RouteWrapper from './RouteWrapper';
import Layout from './views/layout/layout';
import { LAYOUT_ROUTES } from './routes';
import AuthenticatedRouteHOC from './HOC/AuthenticatedRoute';
import UnauthenticatedRouteHOC from './HOC/UnauthenticatedRoute';
import Login from './views/login/Login';
import AML404Component from './utils/components/AML404Component';

const App: React.FC = () => (
  <Provider store={store}>
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onError={errorBoundaryHelper}
    >
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <RouteWrapper>
            <Routes>
              <Route path='/' element={<Layout />}>
                {LAYOUT_ROUTES.map((route) => (
                  <Route
                    path={route.path}
                    key={route.key}
                    Component={
                      route.component && AuthenticatedRouteHOC(route.component)
                    }
                  />
                ))}
                <Route
                  path='/login'
                  Component={UnauthenticatedRouteHOC(Login)}
                />
                <Route path='*' Component={AML404Component} />
              </Route>
            </Routes>
          </RouteWrapper>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </Provider>
);

export default App;
