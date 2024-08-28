import classNames from 'classnames';
import React, { FC } from 'react';
import { InputProps } from 'shared-resources/types/Input.type';
import InputHelper from '../Inputhelper/InputHelper';
import InputLabel from '../InputLabel/InputLabel';
import PasswordInput from './PasswordInput';

const Input: FC<InputProps> = (props: InputProps) => {
  const {
    value,
    type,
    onChange,
    placeholder,
    label,
    helperText,
    leadingIcon,
    trailingIcon,
    className,
    labelClassName,
    style,
    disabled,
    error,
    showErrorText = true,
  } = props;
  if (type === 'password') return <PasswordInput {...props} />;
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
          <div className='absolute inset-y-0 left-0 flex items-center w-8 pl-3 pointer-events-none'>
            {leadingIcon}
          </div>
        )}
        <input
          value={value}
          type={type}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          style={style}
          className={classNames(
            `form-input block w-full border rounded-md py-1.5 2xl:py-3 px-5 text-xs 2xl:text-base placeholder-opacity-50 `,
            {
              'pl-10': !!leadingIcon,
              'pr-10': !!trailingIcon,
              'mt-2': !!label,
              'text-gray-500 bg-gray-100 px-2': !!disabled,
              'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red':
                !!error,
            },
            className
          )}
        />
        {trailingIcon && (
          <div className='absolute inset-y-0 right-0 flex items-center w-8 pr-3 pointer-events-none'>
            {trailingIcon}
          </div>
        )}
      </div>
      <InputHelper type='helper' text={error ? undefined : helperText} />
      {showErrorText && <InputHelper type='error' text={error} />}
    </>
  );
};

export default React.memo(Input);
