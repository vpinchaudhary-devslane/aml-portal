import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { authFetchMeAction } from 'store/actions/auth.action';
import {
  isAuthLoadingSelector,
  isAuthenticatedSelector,
  isLoggingOutSelector,
  learnerIdSelector,
} from 'store/selectors/auth.selector';
import Loader from 'shared-resources/components/Loader/Loader';
import useCookie from '../hooks/useCookie';

const AuthenticatedRouteHOC = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isLoading = useSelector(isAuthLoadingSelector);
    const loggedInUser = useSelector(learnerIdSelector);
    const isLoggingOut = useSelector(isLoggingOutSelector);
    const [loading, setLoading] = useState(true);
    const hasConnectSid = useCookie('connect.sid');

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }

      if (hasConnectSid && !isAuthenticated && !isLoading && !isLoggingOut) {
        if (hasConnectSid) {
          dispatch(authFetchMeAction());
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasConnectSid, isAuthenticated, isLoading, searchParams, isLoggingOut]);

    useEffect(() => {
      if (loggedInUser) {
        setLoading(false);
      } else if (!isLoading) {
        setLoading(false);
      }
    }, [loggedInUser, isLoading]);

    if (loading) {
      return (
        <div className='flex items-center justify-center w-screen h-screen'>
          <Loader />
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
