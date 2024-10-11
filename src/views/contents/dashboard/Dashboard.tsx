import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { fetchLearnerJourney } from 'store/actions/learnerJourney.actions';

const DashboardC: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStartClick = () => {
    navigate('/instructions');
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

export default DashboardC;
