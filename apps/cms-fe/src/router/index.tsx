import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import LayoutDashboard from '../layouts/DashBoard';


import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Update from '../pages/Home/Update'

const router = createBrowserRouter([
  {
    path: '/login',
    element: < Login />,
  },
  {
    path: '/Dashboard',
    element: <LayoutDashboard />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'update',
        element:<Update/>
      }
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
