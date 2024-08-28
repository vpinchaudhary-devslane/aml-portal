import React from 'react';
import classNames from 'classnames';
import { AbbreviatedSize } from 'shared-resources/types/AbbreviatedSize.type';
import './Spinner.module.css';

export interface Props {
  size?: AbbreviatedSize;
  border?: string;
  customClassName?: string;
}

const TopRoundedSpinner: React.FunctionComponent<Props> = ({
  size = 'md',
  border = 'border-red-300',
  customClassName,
}) => {
  const spinnerClassForSize: Record<AbbreviatedSize, string> = {
    xs: 'spinner-xs',
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
    xl: 'spinner-xl',
    custom: '',
  };

  return (
    <div
      className={classNames(
        'animate-spin',
        'rounded-full',
        'border-t-4',
        spinnerClassForSize[size],
        border,
        customClassName
      )}
    />
  );
};

export default React.memo(TopRoundedSpinner);
