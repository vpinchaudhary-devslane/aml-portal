import React from 'react';
import { useSelector } from 'react-redux';
import QuestionHeader from 'shared-resources/components/QuestionHeader/QuestionHeader';
import { loggedInUserSelector } from 'store/selectors/auth.selector';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Completed: React.FC = () => {
  const userSelector = useSelector(loggedInUserSelector);
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
      <div className='flex flex-col'>
        <QuestionHeader
          HeaderText={`Hello, ${userSelector?.username || 'Learner'}`}
        />
        <div className='flex md:gap-[85px] items-end flex-col md:flex-row'>
          <div className='md:w-full h-[250px] sm:h-[350px] md:h-[450px] max-h-[480px] p-20 border-[1px] md:mx-[60px] border-black mt-[61px] flex items-center justify-center'>
            <span className='text-4xl font-semibold text-headingTextColor'>
              Congratulations!! You have completed all question sets.
            </span>{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default Completed;
