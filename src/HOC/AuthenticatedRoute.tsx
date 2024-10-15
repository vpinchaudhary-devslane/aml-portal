import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { authFetchMeAction } from 'store/actions/auth.action';
import {
  isAuthLoadingSelector,
  isAuthenticatedSelector,
} from 'store/selectors/auth.selector';
import Spinner from 'shared-resources/components/Spinner/Spinner';

const AuthenticatedRouteHOC = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedRoute: React.FC<P> = ({ ...props }) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isLoading = useSelector(isAuthLoadingSelector);

    useEffect(() => {
      const checkConnectSid = () =>
        document.cookie
          .split(';')
          .some((item) => item.trim().startsWith('connect.sid='));
      const currentTime = new Date();
      if (checkConnectSid() && !isAuthenticated && !isLoading) {
        setTimeout(() => {
          if (checkConnectSid()) {
            dispatch(authFetchMeAction());
          }
        }, 100);
      }
    }, [isAuthenticated, isLoading, searchParams]);

    if (isLoading) {
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
