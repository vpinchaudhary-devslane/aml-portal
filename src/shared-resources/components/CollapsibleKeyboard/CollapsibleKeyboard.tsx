import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import KeyboardClosedStateIcon from '../../icons/KeyboardClosedStateIcon';
import ArrowRight from '../../icons/ArrowRight';

const CollapsibleKeyboard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

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
        <div>
          <span>Keyboard keys</span>
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
