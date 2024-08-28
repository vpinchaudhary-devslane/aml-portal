import { useField } from 'formik';
import React, { FC, memo } from 'react';
// components
import PhoneInput, { PhoneInputProps } from './PhoneInput';

interface FormikPhoneInputProps
  extends Omit<PhoneInputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus'> {
  name: string;
}

const FormikPhoneInput: FC<FormikPhoneInputProps> = (props) => {
  const { name } = props;
  const [, meta, helpers] = useField(name);

  const { value, error } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <PhoneInput
      value={value}
      onChange={(e): void => setValue(e)}
      onFocus={() => setTouched(true)}
      error={error}
      {...props}
    />
  );
};

export default memo(FormikPhoneInput);
