import React, { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { authLogoutAction } from '../../store/actions/auth.action';
import {
  isAuthLoadingSelector,
  learnerIdSelector,
  loggedInUserSelector,
} from '../../store/selectors/auth.selector';
import { webRoutes } from '../../utils/constants/webRoutes.constants';
import Header from './Header';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isUserLoading = useSelector(isAuthLoadingSelector);
  const learnerId = useSelector(learnerIdSelector);
  const userSelector = useSelector(loggedInUserSelector);

  useEffect(() => {
    if (location.pathname === '/' && !isUserLoading && !learnerId) {
      navigate(webRoutes.auth.login());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, learnerId, isUserLoading]);

  const onLogout = () => {
    dispatch(authLogoutAction());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authContextValue = useMemo(() => ({ onLogout }), []);

  return isUserLoading ? null : (
    <AuthContext.Provider value={authContextValue}>
      <div className='flex flex-col h-full'>
        <Header leanrerId={learnerId} username={userSelector?.username} />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
