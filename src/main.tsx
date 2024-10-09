import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

// if (ENV_CONFIG.APP_ENV !== 'development') {
//   console.log = () => {};
// }

const root = createRoot(document.querySelector('#root')!);
root.render(<App />);
