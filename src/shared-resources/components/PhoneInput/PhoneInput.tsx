import React, { FC, FocusEvent, memo } from 'react';
// phone libs
import Phone from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// components
import InputHelper from '../Inputhelper/InputHelper';

export interface PhoneInputProps {
  countryCodeEditable?: boolean;
  enableCountrySearch?: boolean;
  value?: string | null;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
  showErrorText?: boolean;
  disabled?: boolean;
  helperText?: string;
}

const PhoneInput: FC<PhoneInputProps> = (props) => {
  const {
    countryCodeEditable = false,
    enableCountrySearch = false,
    value,
    onChange,
    onBlur,
    onFocus,
    name,
    error,
    showErrorText = true,
    disabled,
    helperText,
  } = props;

  return (
    <>
      <Phone
        country='in'
        countryCodeEditable={countryCodeEditable}
        enableSearch={enableCountrySearch}
        value={value}
        onChange={(updated) => onChange(updated)}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={{ name }}
        disableSearchIcon
        disabled={disabled}
      />
      <InputHelper type='helper' text={error ? undefined : helperText} />
      {showErrorText && <InputHelper type='error' text={error} />}
    </>
  );
};

export default memo(PhoneInput);
