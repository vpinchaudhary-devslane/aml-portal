import { useField } from 'formik';
import React from 'react';
import { CheckboxProps } from 'shared-resources/types/Checbox.type';
import Checkbox from './Checkbox';

interface FormikChecboxProps extends Omit<CheckboxProps, 'onChange' | 'value'> {
  name: string;
}

const FormikCheckbox: React.FC<FormikChecboxProps> = (props) => {
  const { name } = props;
  const [, meta, helpers] = useField(name);

  const { value, error } = meta;
  const { setValue } = helpers;

  return (
    <Checkbox
      value={value}
      onChange={(e): void => setValue(e.target.checked)}
      error={error}
      {...props}
    />
  );
};

export default React.memo(FormikCheckbox);
