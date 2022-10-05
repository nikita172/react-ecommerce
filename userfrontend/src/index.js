import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios"
import { API_BASE } from './config';

axios.defaults.baseURL = API_BASE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);


