/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { navigationPathSelector } from 'store/selectors/navigation.selector';
import { localStorageService } from 'services/LocalStorageService';
import { learnerIdSelector } from 'store/selectors/auth.selector';
import { syncLearnerResponse } from 'store/actions/syncLearnerResponse.action';

// Define props for NavigationHandler
type NavigationHandlerProps = {
  children: React.ReactNode; // To accept any children passed to the component
};

const NavigationHandler: React.FC<NavigationHandlerProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learnerId = useSelector(learnerIdSelector);

  const navigationPath = useSelector(navigationPathSelector);

  useEffect(() => {
    if (navigationPath) {
      navigate(navigationPath); // Perform the navigation
      dispatch({ type: 'CLEAR_NAVIGATION_PATH' }); // Clear the navigation path after navigating
    }
  }, [navigationPath, navigate, dispatch]);

  useEffect(() => {
    // Declare a variable to hold the interval ID
    let intervalId: any | null = null;

    if (learnerId) {
      // Start syncing if the user is authenticated
      const syncLearnerResponseData = () => {
        const data =
          localStorageService.getLearnerResponseData(String(learnerId)) || [];

        if (data.length > 0) {
          dispatch(
            syncLearnerResponse({
              learner_id: learnerId,
              questions_data: data,
            })
          );
        }
      };

      // Sync every 2 minutes (120000ms)
      intervalId = setInterval(syncLearnerResponseData, 120000);
      // Initial sync on component mount
      syncLearnerResponseData();
    }
    // Cleanup function to clear the interval when the user logs out
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [learnerId]);

  return <>{children}</>; // Render the children
};

export default NavigationHandler;
