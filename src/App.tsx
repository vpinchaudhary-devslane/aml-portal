import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import CollapsibleKeyboard from './shared-resources/components/CollapsibleKeyboard/CollapsibleKeyboard';

const App: React.FC = () => (
  <Provider store={store}>
    <div className='h-full'>
      <h1>Welcome to AML Portal!</h1>
      <div className='absolute top-1/2 right-0 -translate-y-1/2'>
        <CollapsibleKeyboard />
      </div>
    </div>
  </Provider>
);

export default App;
