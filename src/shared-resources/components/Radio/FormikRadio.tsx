import { useField } from 'formik';
import React, { FC, memo } from 'react';
// components
import InputHelper from '../Inputhelper/InputHelper';
import Radio, { RadioProps } from './Radio';

interface FormikRadioProps extends Omit<RadioProps, 'onChange' | 'selected'> {
  name: string;
}

const FormikRadio: FC<FormikRadioProps> = (props) => {
  const { name } = props;
  const [, meta, helpers] = useField<string | null>(name);

  const { value, error } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <>
      <Radio
        selected={value}
        onChange={setValue}
        onFocus={() => setTouched(true)}
        {...props}
      />
      ;{error && <InputHelper type='error' text={error} />}
    </>
  );
};

export default memo(FormikRadio);
