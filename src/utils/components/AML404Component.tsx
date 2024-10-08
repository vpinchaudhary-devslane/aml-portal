import React from 'react';
import Button from 'shared-resources/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '../constants/webRoutes.constants';

const AML404Component: React.FC = () => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(webRoutes.dashboard.root());
  };

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-[2rem] flex items-center'>404: Page not found</p>
        <Button
          onClick={onGoBack}
          className='text-white text-base override:w-40 override:h-12 override:mt-2'
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default AML404Component;
