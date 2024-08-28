import { ReactNode } from 'react';

export interface TabItemProps {
  id: string;
  title: ReactNode;
  component: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItemProps[];
}
