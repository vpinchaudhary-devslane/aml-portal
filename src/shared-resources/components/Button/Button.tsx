import classNames from 'classnames';
import React from 'react';
import Spinner from '../Spinner/Spinner';

interface Props {
  type?: 'button' | 'submit';
  className?: string;
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  isSubmitting?: boolean;
  trailingIcon?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  type,
  className,
  children,
  onClick,
  disabled,
  isSubmitting,
  trailingIcon,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      'h-full w-full bg-blue-500',
      'inline-flex relative',
      'rounded-lg',
      'justify-center',
      'items-center',
      'focus:outline-none',
      'transition ease-in-out',
      'duration-150',
      disabled ? 'pointer-events-none opacity-50' : '',
      className
    )}
  >
    <div className='flex h-full py-1'>
      {isSubmitting && <Spinner size='xs' border='border-white-300' />}
      {!isSubmitting && children}
      {!isSubmitting && trailingIcon && trailingIcon}
    </div>
  </button>
);

export default React.memo(Button);
