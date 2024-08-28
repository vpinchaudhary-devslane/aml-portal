import { HiEye, HiEyeOff } from 'react-icons/hi';
import classNames from 'classnames';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { InputProps } from 'shared-resources/types/Input.type';
import InputHelper from '../Inputhelper/InputHelper';
import InputLabel from '../InputLabel/InputLabel';

interface PasswordProps extends Omit<InputProps, 'trailingIcon'> {}

const PasswordInput: FunctionComponent<PasswordProps> = ({
  value,
  onChange,
  placeholder,
  label,
  helperText,
  leadingIcon,
  className,
  labelClassName,
  style,
  disabled,
  error,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = useCallback(() => setVisible(!visible), [visible]);

  return (
    <>
      {label && (
        <InputLabel
          label={label}
          className={`text-xs 2xl:text-base font-medium ${labelClassName}`}
        />
      )}

      <div className='relative rounded-md '>
        {leadingIcon && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            {leadingIcon}
          </div>
        )}
        <input
          value={value}
          type={visible ? 'text' : 'password'}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          style={style}
          data-lpignore='true'
          className={classNames(
            `pr-10 form-input block w-full border rounded-md py-1.5 2xl:py-3 px-5 text-xs 2xl:text-base placeholder-opacity-50 `,
            {
              'pl-10': !!leadingIcon,
              'mt-2': !!label,
              'text-gray-500 bg-gray-100 px-2': !!disabled,
              'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
                !!error,
            },
            className
          )}
        />
        <div
          aria-hidden
          className='absolute inset-y-0 right-0 flex items-center w-8 pr-3'
          onClick={() => handleChange()}
        >
          {visible ? (
            <HiEye className='text-gray-400 cursor-pointer' />
          ) : (
            <HiEyeOff className='text-gray-400 cursor-pointer' />
          )}
        </div>
      </div>
      <InputHelper type='helper' text={error ? undefined : helperText} />
      <InputHelper type='error' text={error} />
    </>
  );
};

export default React.memo(PasswordInput);
