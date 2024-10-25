/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Material UI icons for back and next arrows
import QuestionHeader from 'shared-resources/components/QuestionHeader/QuestionHeader';
import Button from 'shared-resources/components/Button/Button';

const Instructions: React.FC = () => {
  const navigate = useNavigate();
  // const videoUrls = useSelector(videoUrlsSelector); // Get video URLs from Redux

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoUrls = [
    'https://www.youtube.com/watch?v=on4UALTb1DQ',
    'https://www.youtube.com/watch?v=cLLhzxe5aBk',
  ];

  const handleNextClick = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prevPlaying) => !prevPlaying);
  };

  const handleStartClick = () => {
    navigate('/questions');
  };

  return (
    <div className='flex flex-col'>
      <QuestionHeader HeaderText='Instructions' />
      <div className='flex md:gap-[85px] items-end flex-col md:flex-row'>
        <div className='md:w-[962px] h-[250px] sm:h-[350px] md:h-[450px] max-h-[480px] md:ml-[60px] mt-[61px] flex items-center justify-center'>
          <div className='flex items-center justify-between w-full h-full'>
            <button
              className='text-gray-600 hover:text-gray-800 disabled:opacity-50'
              onClick={handleBackClick}
              disabled={currentVideoIndex === 0}
            >
              <ArrowBack fontSize='large' />
            </button>

            <div className='flex-1 h-full'>
              <ReactPlayer
                url={videoUrls[currentVideoIndex]}
                playing={isPlaying}
                controls
                width='100%'
                height='100%'
                className='rounded-lg overflow-hidden'
              />
            </div>

            <button
              className='text-gray-600 hover:text-gray-800 disabled:opacity-50'
              onClick={handleNextClick}
              disabled={currentVideoIndex === videoUrls.length - 1}
            >
              <ArrowForward fontSize='large' />
            </button>
          </div>
        </div>

        <div className='md:pb-16'>
          <Button type='button' onClick={handleStartClick}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
