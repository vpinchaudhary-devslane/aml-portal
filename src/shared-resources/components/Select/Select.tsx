import React, { useMemo } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import { EntityIdentifier } from 'shared-resources/types/EntityIdentifier.type';
import { SelectItemType } from 'shared-resources/types/SelectItems.type';
import SelectControl from './SelectControl';
import SelectItem from './SelectItem';
import { SelectMultiContainer } from './SelectMultiValue';

export interface SelectProps {
  items: SelectItemType[];
  onChange: (value?: EntityIdentifier | EntityIdentifier[]) => void;
  selected?: EntityIdentifier | EntityIdentifier[];
  placeholder?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  autoFocus?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    items,
    selected,
    placeholder,
    onChange,
    isDisabled,
    isMulti,
    autoFocus,
    isSearchable,
    isLoading,
    isClearable,
  } = props;

  const currentValue: SelectItemType | SelectItemType[] | undefined =
    useMemo(() => {
      if (isMulti && Array.isArray(selected)) {
        return items.filter((option: SelectItemType) =>
          selected.includes(option.value)
        );
      }
      return items.find((option: SelectItemType) => selected === option.value);
    }, [isMulti, selected, items]);

  const handleChange = (
    item: SingleValue<SelectItemType> | MultiValue<SelectItemType>
  ): void => {
    const previousValue = currentValue;
    if (
      Array.isArray(previousValue) &&
      !previousValue.some(
        (option) => option.value === (item as SelectItemType)?.value
      )
    ) {
      onChange([
        ...(selected as EntityIdentifier[]),
        (item as SelectItemType)?.value,
      ]);
    } else {
      onChange((item as SelectItemType)?.value);
    }
  };

  return (
    <div className='fixed w-[50%] top-16'>
      <ReactSelect
        value={currentValue}
        isMulti={isMulti}
        onChange={handleChange}
        options={items}
        isDisabled={isDisabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        hideSelectedOptions={false}
        isSearchable={isSearchable}
        isLoading={isLoading}
        components={{
          Option: SelectItem,
          Control: SelectControl,
          MultiValueContainer: SelectMultiContainer,
        }}
        isClearable={isClearable}
      />
    </div>
  );
};

export default React.memo(Select);
