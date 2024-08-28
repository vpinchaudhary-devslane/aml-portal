import classNames from 'classnames';
import React, { memo } from 'react';
import { components, ControlProps } from 'react-select';
import { SelectItemType } from 'shared-resources/types/SelectItems.type';

type SelectControlProps = ControlProps<SelectItemType>;

const SelectControl: React.FC<SelectControlProps> = (
  controlProps: ControlProps<SelectItemType>
) => {
  const { children } = controlProps;
  return (
    <components.Control {...controlProps} className={classNames('!border-1')}>
      {children}
    </components.Control>
  );
};

export default memo(SelectControl);
