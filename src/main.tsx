import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntakeForm } from './IntakeForm';
import './IntakeForm.css';
import './IntakeForm.override.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntakeForm />
  </React.StrictMode>
);
