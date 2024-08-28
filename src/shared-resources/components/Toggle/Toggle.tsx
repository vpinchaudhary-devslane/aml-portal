import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { ToggleProps } from 'shared-resources/types/Toggle.type';

const Toggle: React.FC<ToggleProps> = (props) => {
  const { enabled, setEnabled, disabled } = props;

  return (
    <Switch
      checked={enabled}
      disabled={disabled}
      onChange={setEnabled}
      className={classNames(
        disabled && 'pointer-events-none opacity-50',
        enabled ? 'bg-blue-900' : 'bg-blue-700',
        'relative inline-flex flex-shrink-0 h-7 w-20 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
      )}
    >
      <span
        aria-hidden='true'
        className={`${enabled ? 'translate-x-[3.25rem]' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
};

export default Toggle;
