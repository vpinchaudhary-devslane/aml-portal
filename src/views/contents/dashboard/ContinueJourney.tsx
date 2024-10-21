import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { loggedInUserSelector } from 'store/selectors/auth.selector';

const ContinueJourney: React.FC = () => {
  const navigate = useNavigate();
  const userSelector = useSelector(loggedInUserSelector);

  const handleResumeClick = () => {
    navigate('/questions');
  };

  return (
    <ContainerLayout
      headerText={`Welcome back ${userSelector?.username || 'Learner'}`}
      content={
        <div className='text-lg'>
          Click resume to continue from where you left.{' '}
        </div>
      }
      buttonText='RESUME'
      onButtonClick={handleResumeClick}
    />
  );
};

export default ContinueJourney;
