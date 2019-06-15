import React from 'react';
import './App.css';
import { Car } from './components';
import { client } from './graphql';
import { Provider } from './providers';

function App() {
  return (
    <Provider client={client}>
      <Car />
    </Provider>
  );
}

export default App;
