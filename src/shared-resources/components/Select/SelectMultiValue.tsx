import React from 'react';
import { components, MultiValueGenericProps } from 'react-select';
import { SelectItemType } from 'shared-resources/types/SelectItems.type';

type SelectMultiValueContainerProps = MultiValueGenericProps<SelectItemType>;

export const SelectMultiContainer: React.FC<SelectMultiValueContainerProps> = (
  props: MultiValueGenericProps<SelectItemType>
) => {
  const { children } = props;
  return (
    <components.MultiValueContainer {...props}>
      <span className='flex bg-blue-200'>{children}</span>
    </components.MultiValueContainer>
  );
};
