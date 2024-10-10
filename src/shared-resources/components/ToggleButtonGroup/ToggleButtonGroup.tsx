import React from 'react';
import MatToggleButton from '@mui/material/ToggleButton';
import MatToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './ToggleButtonGroup.scss';
import { ToggleButtonGroupProps } from '../../types/ToggleButtonGroup.type';

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  error,
}) => (
  <div>
    <MatToggleButtonGroup
      value={selectedValue}
      exclusive
      onChange={(_, val) => setSelectedValue(val)}
      className='toggle-btn-group gap-x-[58px] gap-y-8 !grid grid-cols-2'
      aria-errormessage={error}
    >
      {options
        .filter((option) => option !== '')
        .map((option) => (
          <MatToggleButton
            key={option}
            value={option}
            className='w-[236px] !py-2 !border-2 !m-0 !border-black !rounded-2xl !text-4xl !font-semibold !text-black !font-publicSans'
            disableRipple
          >
            {option}
          </MatToggleButton>
        ))}
    </MatToggleButtonGroup>
    {error && (
      <p className='text-error text-xs mt-[3px] mx-[14px] font-normal'>
        {error}
      </p>
    )}
  </div>
);

export default ToggleButtonGroup;
