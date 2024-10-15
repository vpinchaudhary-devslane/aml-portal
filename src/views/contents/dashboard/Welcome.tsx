import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { fetchLearnerJourney } from 'store/actions/learnerJourney.actions';
import {
  isLearnerJourneyLoadingSelector,
  learnerJourneySelector,
} from 'store/selectors/learnerJourney.selector';

const Welcome: React.FC = () => {
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

  useEffect(() => {
    dispatch(fetchLearnerJourney('dhdjkhas3424234hjhjk'));
  });

  return (
    <ContainerLayout
      headerText='Hello, Nivedha Shivaraman'
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
