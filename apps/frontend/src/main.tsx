import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client'; 
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
