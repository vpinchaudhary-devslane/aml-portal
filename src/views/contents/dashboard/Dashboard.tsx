import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'shared-resources/components/Loader/Loader';
import {
  isLearnerJourneyLoadingSelector,
  learnerJourneySelector,
} from 'store/selectors/learnerJourney.selector';

const DashboardC: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const journeyData = useSelector(learnerJourneySelector);
  const loading = useSelector(isLearnerJourneyLoadingSelector);

  const handleStartClick = () => {
    if (journeyData) {
      navigate('/continue-journey'); // Redirect to Continue Journey Page
    } else {
      navigate('/welcome'); // Redirect to Instructions Page
    }
  };

  return (
    <div className='md:w-full h-[250px] sm:h-[350px] md:h-[450px] max-h-[480px] mt-[61px] flex items-center justify-center'>
      <Loader />
    </div>
  );
};

export default DashboardC;
