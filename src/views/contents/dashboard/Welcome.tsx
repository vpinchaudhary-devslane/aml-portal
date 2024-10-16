import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { loggedInUserSelector } from 'store/selectors/auth.selector';
import {
  isLearnerJourneyLoadingSelector,
  learnerJourneySelector,
} from 'store/selectors/learnerJourney.selector';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const journeyData = useSelector(learnerJourneySelector);
  const loading = useSelector(isLearnerJourneyLoadingSelector);
  const userSelector = useSelector(loggedInUserSelector);

  const handleStartClick = () => {
    navigate('/instructions'); // Redirect to questions
  };

  return (
    <ContainerLayout
      headerText={`Hello, ${userSelector?.username || 'Learner'}`}
      content={
        <span className='text-4xl font-semibold text-headingTextColor'>
          Press Start to Begin
        </span>
      }
      buttonText='Start'
      onButtonClick={handleStartClick}
    />
  );
};

export default Welcome;
