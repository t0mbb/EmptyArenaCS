import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import LayoutDashboard from '../layouts/Dashboard';


import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Update from '../pages/Home/Update'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: < Login />,
  },
  {
    path: '/Dashboard',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'update/:id',
        element:<Update/>
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
