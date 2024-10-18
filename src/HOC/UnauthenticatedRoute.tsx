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
  isLoggingOutSelector,
} from 'store/selectors/auth.selector';
// components
import Spinner from 'shared-resources/components/Spinner/Spinner';
import useCookie from '../hooks/useCookie';

const UnauthenticatedRouteHOC = <P extends {}>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const UnauthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isLoading = useSelector(isAuthLoadingSelector);
    const isLoggingOut = useSelector(isLoggingOutSelector);
    const prevLink = localStorageService.getLocalStorageValue(PREV_LINK);
    const hasConnectSid = useCookie('connect.sid');

    useEffect(() => {
      if (hasConnectSid && !isAuthenticated && !isLoading && !isLoggingOut) {
        if (hasConnectSid) {
          dispatch(authFetchMeAction());
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasConnectSid, isAuthenticated, isLoading]);

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
