import React, { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import KeyboardClosedStateIcon from '../../icons/KeyboardClosedStateIcon';
import ArrowRight from '../../icons/ArrowRight';
import KeyboardButton from './KeyboardButton';
import { KEYBOARD_KEYS } from '../../../constant/constants';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

type Props = {
  onKeyClick?: (key: string) => void;
  onBackSpaceClick?: () => void;
}

const CollapsibleKeyboard: React.FC<Props> = ({onBackSpaceClick, onKeyClick}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => setExpanded(!expanded);

  const keyboardKeys = useMemo(() => {
    return KEYBOARD_KEYS.map(key => (
      <KeyboardButton onClick={() => onKeyClick?.(key)}>{key}</KeyboardButton>
    ))
  }, [])

  return (
    <div
      className='transition-all ease-in-out relative h-[379px] w-[389px] overflow-hidden'
    >
      <IconButton
        className={cx('!p-0 absolute top-1/2 -translate-y-1/2', {
          '!hidden': expanded,
          '-right-[calc(100%-73px)]': !expanded,
        })}
        disableRipple
        onClick={toggleExpanded}
      >
        <KeyboardClosedStateIcon />
      </IconButton>

      <div
        className={cx(
          'bg-disabled absolute w-full h-full rounded-tl-[20px] rounded-bl-[20px] flex justify-between items-center py-[30px] pl-[38px] pr-[17px]',
          {
            'right-0': expanded,
            '-right-full hidden': !expanded,
          }
        )}
      >
        <div className='grid grid-cols-3 gap-2.5'>
          {keyboardKeys}
          <KeyboardButton onClick={() => onBackSpaceClick?.()}>
            <BackspaceOutlinedIcon className='text-[#49454F] !text-4xl' />
          </KeyboardButton>
        </div>

        <IconButton
          className={cx('!p-0 h-fit')}
          disableRipple
          onClick={toggleExpanded}
        >
          <ArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

export default CollapsibleKeyboard;
