import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';

const Instructions: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/questions');
  };

  return (
    <ContainerLayout
      headerText='Instructions'
      content={
        <div className='text-lg'>
          <p>Here are the instructions for the questions:</p>
          <ul>
            <li>Read each question carefully.</li>
            <li>Select the correct answer.</li>
            <li>Click "Next" to proceed to the next question.</li>
          </ul>
        </div>
      }
      buttonText='Start'
      onButtonClick={handleStartClick}
    />
  );
};

export default Instructions;
