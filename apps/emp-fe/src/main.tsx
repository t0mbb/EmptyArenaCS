import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(import.meta.env.VITE_BASE_URL);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
