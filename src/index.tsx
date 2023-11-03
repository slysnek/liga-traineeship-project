import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WrappedApp } from './app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
