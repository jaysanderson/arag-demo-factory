import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initColorScheme } from './lib/theme';
// Kendo theme first, so our own index.css / Tailwind overrides win where needed.
import '@progress/kendo-theme-default/dist/all.css';
import './index.css';

// Set light/dark before first paint to avoid a flash.
initColorScheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
