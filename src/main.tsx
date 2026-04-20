import React from 'react';
import ReactDOM from 'react-dom/client';
import FormExample from './examples/FormExample';
import App from './App';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FormExample/>
    <App />
  </React.StrictMode>
)
