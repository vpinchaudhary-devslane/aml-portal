import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';

const App: React.FC = () => (
  <Provider store={store}>
    <div className='flex flex-col h-full'>
      <h1>Welcome to AML Portal!</h1>
    </div>
  </Provider>
);

export default App;
