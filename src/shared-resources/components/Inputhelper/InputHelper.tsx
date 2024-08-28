import classNames from 'classnames';
import React from 'react';

export interface InputHelperProps {
  type?: 'error' | 'helper';
  text?: string;
}

const InputHelper: React.FC<InputHelperProps> = ({ text, type = 'helper' }) =>
  text ? (
    <p
      className={classNames('mt-2 text-sm', {
        'text-red-600': type === 'error',
        'text-gray-500': type === 'helper',
      })}
      id='input-error'
    >
      {text}
    </p>
  ) : null;

export default React.memo(InputHelper);
