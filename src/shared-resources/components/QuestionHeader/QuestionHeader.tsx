import { VolumeOff, VolumeUp } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import { ttsInstance } from 'services/TextToSpeechService';
import Loader from '../Loader/Loader';

interface QuestionheaderProps {
  HeaderText: string;
  ttsAvailable?: boolean;
}

const QuestionHeader: React.FC<QuestionheaderProps> = (
  props: QuestionheaderProps
) => {
  const { HeaderText } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTTSClick = useCallback(() => {
    if (isPlaying) {
      ttsInstance.stop();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      ttsInstance.speak(
        HeaderText.toString(),
        'en',
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsLoading(false)
      );
      setIsLoading(true);
    }
  }, [HeaderText, isPlaying]);

  return (
    <div>
      <p className='flex items-center gap-5 md:w-[65%] md:text-start text-3xl md:text-4xl font-semibold text-headingTextColor pt-6 -mb-1'>
        {HeaderText}
        {Boolean(props?.ttsAvailable) && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <span
            className='cursor-pointer p-3 flex items-center justify-center rounded-lg hover:bg-slate-200'
            onClick={handleTTSClick}
          >
            {isLoading && <Loader />}
            {!isLoading &&
              (!isPlaying ? (
                <VolumeUp fontSize='large' />
              ) : (
                <VolumeOff fontSize='large' />
              ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default QuestionHeader;
