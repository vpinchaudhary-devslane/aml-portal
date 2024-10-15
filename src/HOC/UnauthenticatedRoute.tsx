import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// services
import { PREV_LINK, localStorageService } from 'services/LocalStorageService';
// actions
import { authFetchMeAction } from 'store/actions/auth.action';
// selectors
import {
  isAuthLoadingSelector,
  isAuthenticatedSelector,
} from 'store/selectors/auth.selector';
// components
import Spinner from 'shared-resources/components/Spinner/Spinner';

const UnauthenticatedRouteHOC = <P extends {}>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const UnauthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isLoading = useSelector(isAuthLoadingSelector);
    const prevLink = localStorageService.getLocalStorageValue(PREV_LINK);

    useEffect(() => {
      const checkConnectSid = () =>
        document.cookie
          .split(';')
          .some((item) => item.trim().startsWith('connect.sid='));
      if (checkConnectSid() && !isAuthenticated && !isLoading) {
        setTimeout(() => {
          if (checkConnectSid()) {
            dispatch(authFetchMeAction());
          }
        }, 100);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
      return (
        <div className='flex items-center justify-center w-screen h-screen'>
          <Spinner size='lg' />
        </div>
      );
    }

    return !isAuthenticated ? (
      <Component {...(props as P)} />
    ) : (
      <Navigate to={prevLink ?? '/'} />
    );
  };

  return UnauthenticatedRoute;
};

export default UnauthenticatedRouteHOC;
