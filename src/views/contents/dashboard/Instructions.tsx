import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { questionsSetSelector } from 'store/selectors/questionSet.selector';

const Instructions: React.FC = () => {
  const navigate = useNavigate();
  const questionSet = useSelector(questionsSetSelector);

  const handleStartClick = () => {
    navigate('/questions');
  };

  return (
    <ContainerLayout
      headerText='Instructions'
      content={
        questionSet?.instruction_text ? (
          <p className='text-lg'>{questionSet.instruction_text}</p>
        ) : (
          <div className='text-lg'>
            <p>Here are the instructions for the questions:</p>
            <ul>
              <li>Read each question carefully.</li>
              <li>Select the correct answer.</li>
              <li>Click "Next" to proceed to the next question.</li>
            </ul>
          </div>
        )
      }
      buttonText='Start'
      onButtonClick={handleStartClick}
    />
  );
};

export default Instructions;
