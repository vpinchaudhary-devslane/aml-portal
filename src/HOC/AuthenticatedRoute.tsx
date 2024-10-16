import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { authFetchMeAction } from 'store/actions/auth.action';
import {
  isAuthLoadingSelector,
  isAuthenticatedSelector,
  learnerIdSelector,
} from 'store/selectors/auth.selector';
import Spinner from 'shared-resources/components/Spinner/Spinner';
import useCookie from '../hooks/useCookie';

const AuthenticatedRouteHOC = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isLoading = useSelector(isAuthLoadingSelector);
    const loggedInUser = useSelector(learnerIdSelector);
    const [loading, setLoading] = useState(true);
    const hasConnectSid = useCookie('connect.sid');

    useEffect(() => {
      if (hasConnectSid && !isAuthenticated && !isLoading) {
        setTimeout(() => {
          if (hasConnectSid) {
            dispatch(authFetchMeAction());
          }
        }, 100);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasConnectSid, isAuthenticated, isLoading, searchParams]);

    useEffect(() => {
      if (loggedInUser) {
        setLoading(false);
      }
    }, [loggedInUser]);

    if (isLoading || loading) {
      return (
        <div className='flex items-center justify-center w-screen h-screen'>
          <Spinner size='lg' />
        </div>
      );
    }

    if (isAuthenticated) {
      return <Component {...(props as P)} />;
    }
    return <Navigate to='/login' />;
  };

  return AuthenticatedRoute;
};

export default AuthenticatedRouteHOC;
