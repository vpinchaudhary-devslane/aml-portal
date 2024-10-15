import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';

const ContinueJourney: React.FC = () => {
  const navigate = useNavigate();
  const handleResumeClick = () => {
    navigate('/questions');
  };

  return (
    <ContainerLayout
      headerText='Welcome back'
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
