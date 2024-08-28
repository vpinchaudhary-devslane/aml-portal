import { ReactElement } from 'react';

export interface CheckboxProps {
  error?: string;
  onChange: (event: any) => void;
  value?: boolean;
  disabled?: boolean;
  text?: ReactElement;
}
