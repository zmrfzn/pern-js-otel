import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import './index.css'

// OTEL
import { startOtelInstrumentation } from './opentelemetry';

startOtelInstrumentation();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
