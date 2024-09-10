import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-v1';
import './index.css';

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
