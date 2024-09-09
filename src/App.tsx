import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import ProblemGrid from './shared-resources/components/ProblemGrid/ProblemGrid';

const App: React.FC = () => {
  const [problemSolution, setProblemSolution] = useState({});
  return (
    <Provider store={store}>
      <div className='h-full'>
        <h1>Welcome to AML Portal!</h1>
        <div className='mt-80 ml-80'>
          <ProblemGrid
            problem={[
              ['$', '_', '_', '_', '_', '$'],
              ['$', '2', '3', '2', '2', '6'],
              ['+', '2', '5', '2', '6', '2'],
              ['_', '_', '_', '_', '_', '_'],
            ]}
            problemSolution={problemSolution}
            onInputValueChange={(val, rowIndex, colIndex) => {
              const clonedSolution: any = { ...problemSolution };
              const key = `${rowIndex}_${colIndex}`;
              if (val) {
                clonedSolution[key] = val;
              } else {
                delete clonedSolution[key];
              }
              setProblemSolution(clonedSolution);
            }}
          />
        </div>
      </div>
    </Provider>
  );
};

export default App;
