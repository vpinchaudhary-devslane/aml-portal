import { EntityIdentifier } from './EntityIdentifier.type';

export type SelectItemType = {
  value: EntityIdentifier;
  label: string;
  isDisabled?: boolean;
};
