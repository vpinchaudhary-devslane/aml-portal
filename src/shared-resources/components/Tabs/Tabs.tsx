import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { TabsProps } from 'shared-resources/types/Tabs.type';

const Tabs: React.FC<TabsProps> = (props) => {
  const { items } = props;
  return (
    <div className='w-full max-w-md px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex p-1 space-x-1 bg-blue-100 rounded-xl'>
          {items.map((item) => (
            <Tab
              key={item.id}
              disabled={item.disabled}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-700 hover:bg-white/[0.12] hover:text-blue-400',
                  item.disabled && 'pointer-events-none opacity-50'
                )
              }
            >
              {item.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {items.map((item) => (
            <Tab.Panel
              key={item.id}
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              {item.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default React.memo(Tabs);
