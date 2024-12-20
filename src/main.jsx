import React from 'react';
import { LocaleProvider } from './context/LocaleContext';

const App = () => (
  <LocaleProvider>
    <div>
      <h1>Welcome to the App</h1>
      <p>Use the navigation to explore the application.</p>
    </div>
  </LocaleProvider>
);

export default App;
