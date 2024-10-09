import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';

const DashboardC: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/instructions');
  };

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
