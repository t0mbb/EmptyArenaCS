import { createBrowserRouter ,Navigate } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import LayoutDashboard from '../layouts/Dashboard';
import Homepage from '../pages/Login/Home';
import Details from '../pages/Account/Details';
import ListAcc from '../pages/Account/List'
import UpdateAcc from '../pages/Account/Update'

import RankCreate from '../pages/Rank/Create';
import RankList from '../pages/Rank/List';
import RankUpdate from '../pages/Rank/Update';
import ScheduleHome2 from '../pages/Schedule/scheduleHome'

import RoleProtected, {
  RoleName,
} from '../components/RoleProtected/RoleProtected';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path : '/login',
    element : < Login />,
  },
  {
    path: '',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: 'home',
        element: <Homepage />,
      },
      {
       path : '/account',
       element: <RoleProtected allowedRole={[RoleName.GUEST ,RoleName.ADMIN]}><Details /></RoleProtected>,
       },
      {
        path: '/manageAcc',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><ListAcc /></RoleProtected>,
      },
      {
        path: '/update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><UpdateAcc /></RoleProtected>,
      },
      {
        path: '/schedule',
        element: <ScheduleHome2 />
      },
    ],
  },

  {
    path: '',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: 'rank/',
        element: <RankList />,
      },
      {
       path : 'rank/create',
       element: <RoleProtected allowedRole={[RoleName.ADMIN]}><RankCreate /></RoleProtected>,
       },
       {
        path : 'rank/update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><RankUpdate /></RoleProtected>,
       },

       
    ],
  },

 
  
  {
    path: '*',
    element: <NotFound />,
  },
 
]);

export default router;
