import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { FileProvider } from './context/FileContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <FileProvider>
          <App />
        </FileProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
