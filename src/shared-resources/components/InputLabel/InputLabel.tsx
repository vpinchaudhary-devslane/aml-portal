import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface Props {
  htmlFor?: string;
  label?: string;
  className?: string;
}

const InputLabel: FunctionComponent<Props> = ({
  label,
  htmlFor,
  className,
}) => {
  const renderLabel = (
    <label
      htmlFor={htmlFor}
      className={classNames('block font-medium leading-none', className)}
    >
      {label}
    </label>
  );

  return label ? renderLabel : null;
};

export default InputLabel;
