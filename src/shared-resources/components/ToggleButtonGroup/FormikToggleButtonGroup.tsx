import React from 'react';
import { useField } from 'formik';
import { ToggleButtonGroupProps } from '../../types/ToggleButtonGroup.type';
import ToggleButtonGroup from './ToggleButtonGroup';

interface FormikToggleButtonGroupProps
  extends Omit<ToggleButtonGroupProps, 'selectedValue' | 'setSelectedValue'> {
  name: string;
}

const FormikToggleButtonGroup: React.FC<FormikToggleButtonGroupProps> = (
  props
) => {
  const { name } = props;
  const [, meta, helpers] = useField(name);

  const { value, error } = meta;
  const { setValue } = helpers;

  return (
    <ToggleButtonGroup
      selectedValue={value}
      setSelectedValue={(val) => setValue(val)}
      error={error}
      {...props}
    />
  );
};
