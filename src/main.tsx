import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App';
// import './index.css';
import StarRating from './components/StarRating';

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <StarRating size={40} />
      <StarRating
        color="red"
        maxRating={5}
        messages={['terrible', 'bad', 'ok', 'good', 'awesome']}
        defaultRating={3}
      />
    </StrictMode>
  );
}
