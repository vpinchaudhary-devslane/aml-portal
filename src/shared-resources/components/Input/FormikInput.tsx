import { useField } from 'formik';
import React from 'react';
import { InputProps } from 'shared-resources/types/Input.type';
import Input from './Input';

interface FormikInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  name: string;
}

const FormikInput: React.FC<FormikInputProps> = (props) => {
  const { name } = props;
  const [, meta, helpers] = useField(name);

  const { value, error } = meta;
  const { setValue, setTouched } = helpers; // Set touched on blur

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setTouched(true)} // Mark field as touched on blur
      error={error}
      {...props}
    />
  );
};

export default React.memo(FormikInput);
