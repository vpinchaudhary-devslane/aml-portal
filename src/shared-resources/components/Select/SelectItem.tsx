import React, { memo } from 'react';
import { OptionProps, components } from 'react-select';
import { SelectItemType } from 'shared-resources/types/SelectItems.type';
import { HiCheck } from 'react-icons/hi';
import classNames from 'classnames';

type SelectItemProps = OptionProps<SelectItemType>;

const SelectItem: React.FC<SelectItemProps> = (
  optionProps: OptionProps<SelectItemType>
) => {
  const { data: item, isSelected, isDisabled } = optionProps;
  return (
    <components.Option
      {...optionProps}
      className={classNames({
        'hover:bg-blue-100': !isSelected,
        '!text-gray-800': !isDisabled,
        'hover:bg-transparent': isDisabled,
        '!bg-blue-300 ': isSelected,
      })}
    >
      <span className='flex items-center'>
        {isSelected && <HiCheck />}
        <span className='ml-2'>{item.label}</span>
      </span>
    </components.Option>
  );
};

export default memo(SelectItem);
