/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { ErrorOutline, VolumeDown, VolumeUp } from '@mui/icons-material';
import { isLoadingAudioRecordSelector } from 'store/selectors/audio.selector';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

interface QuestionheaderProps {
  HeaderText: string;
  audioURL?: string;
}

const QuestionHeader: React.FC<QuestionheaderProps> = (
  props: QuestionheaderProps
) => {
  const { HeaderText, audioURL } = props;

  const [audio] = React.useState(new Audio());
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const isLoadingAudioRecord = useSelector(isLoadingAudioRecordSelector);

  const handlePlay = () => {
    audio.src = audioURL!;
    audio.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    audio.addEventListener('ended', handlePause);
    audio.addEventListener('loadstart', () => setIsLoading(true));
    audio.addEventListener('canplaythrough', () => setIsLoading(false));
    audio.addEventListener('error', () => {
      setIsLoading(false);
      setHasError(true);
    });

    return () => {
      audio.removeEventListener('ended', handlePause);
      audio.removeEventListener('loadstart', () => setIsLoading(true));
      audio.removeEventListener('canplaythrough', () => setIsLoading(false));
      audio.removeEventListener('error', () => {
        setIsLoading(false);
        setHasError(true);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className='flex items-center gap-3 md:w-[65%] md:text-start text-3xl md:text-4xl font-semibold text-headingTextColor pt-6 -mb-1 whitespace-nowrap'>
        {HeaderText}
        {Boolean(audioURL) && !isLoadingAudioRecord && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <span
            className='cursor-pointer p-3 flex items-center justify-center rounded-lg hover:bg-slate-200'
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isLoading ? (
              <Loader />
            ) : hasError ? (
              <ErrorOutline className='text-red-500' />
            ) : isPlaying ? (
              <VolumeDown style={{ width: 48, height: 48 }} />
            ) : (
              <VolumeUp style={{ width: 48, height: 48 }} />
            )}
          </span>
        )}
      </p>
    </div>
  );
};

export default QuestionHeader;
