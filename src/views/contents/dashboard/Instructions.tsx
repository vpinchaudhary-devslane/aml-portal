/* eslint-disable jsx-a11y/control-has-associated-label, react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ContainerLayout from 'shared-resources/components/ContainerLayout/ContainerLayout';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Material UI icons for back and next arrows
import QuestionHeader from 'shared-resources/components/QuestionHeader/QuestionHeader';
import Button from 'shared-resources/components/Button/Button';
import { mediaSelector } from 'store/selectors/media.selector';
import { questionsSetSelector } from 'store/selectors/questionSet.selector';

const Instructions: React.FC = () => {
  const navigate = useNavigate();
  // const videoUrls = useSelector(videoUrlsSelector); // Get video URLs from Redux

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const questionSet = useSelector(questionsSetSelector);

  const contentMediaSelector = useSelector(mediaSelector);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);
  const videoUrls = [
    'https://aml-dev-otsv83nane.s3.us-east-1.amazonaws.com/media/content/c_add_042.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDWUK574PGOKPW%2F20241029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241029T121014Z&X-Amz-Expires=600000&X-Amz-Signature=c78e040d25b9391ad11ddce2849f634bc13a3199b1656833487496b009c7dc4a&X-Amz-SignedHeaders=host&x-id=GetObject',
  ];
  useEffect(() => {
    const urls = Object.values(contentMediaSelector).flatMap((item) =>
      item.media.signedUrls.map((urlObj: any) => urlObj.url)
    );
    setMediaURLs(urls);
  }, [contentMediaSelector]);

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
    <>
      {mediaURLs.length ? (
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
      ) : (
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
      )}
    </>
  );
};

export default Instructions;
