import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import MainLayout from '../layouts/MainLayout';
import Layout1 from '../layouts/Layout1';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: < Layout1 />,
    children :[
      {
        path: '',
        element: <Login />,
      }
    ]
    
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
