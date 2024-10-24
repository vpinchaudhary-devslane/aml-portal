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

    // Function to sync learner response data
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

    if (learnerId) {
      intervalId = setTimeout(() => {
        const repeatedSyncInterval = setInterval(
          syncLearnerResponseData,
          120000
        );
        syncLearnerResponseData();

        intervalId = repeatedSyncInterval;
      }, 120000);
    }

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
        clearInterval(intervalId);
      }
    };
  }, [learnerId, dispatch]);

  return <>{children}</>; // Render the children
};

export default NavigationHandler;
