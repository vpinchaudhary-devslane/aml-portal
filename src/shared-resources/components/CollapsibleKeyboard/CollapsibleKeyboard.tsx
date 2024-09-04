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
      className={cx('transition-all ease-in-out relative', {
        'h-[128px] max-w-[73px]': !expanded,
        'h-[379px] w-[389px]': expanded,
      })}
    >
      <IconButton
        className={cx('!p-0 absolute top-1/2 right-0 -translate-y-1/2', {
          '!hidden': expanded,
        })}
        disableRipple
        onClick={toggleExpanded}
      >
        <KeyboardClosedStateIcon />
      </IconButton>

      <div
        className={cx(
          'bg-disabled relative w-full h-full rounded-tl-[20px] rounded-bl-[20px] flex justify-between py-[30px] pl-[38px] pr-[17px]',
          {
            hidden: !expanded,
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
          className={cx('!p-0')}
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
