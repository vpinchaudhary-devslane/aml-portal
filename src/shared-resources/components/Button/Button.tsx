import cx from 'classnames';
import React from 'react';
import MatButton from '@mui/material/Button';

interface Props {
  type?: 'button' | 'submit';
  className?: string;
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  type,
  className,
  children,
  onClick,
  disabled,
}) => (
  <MatButton
    type={type}
    onClick={onClick}
    className={cx(
      '!h-[72px] !w-56 !border-4 !border-solid !shadow-none !rounded-[10px] !text-2xl !font-bold active:opacity-[46%] !font-quicksand',
      disabled ? '!bg-disabled' : '!bg-primary',
      className
    )}
    variant='contained'
    disabled={disabled}
    disableRipple
  >
    {children}
  </MatButton>
);

export default React.memo(Button);
