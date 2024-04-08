import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import LayoutDashboard from '../layouts/Dashboard';

import Home from '../pages/admin/Account/Home';
import Login from '../pages/admin/Login/Login';
import Update from '../pages/admin/Account/Update';
import Detail from '../pages/admin/Account/Detail';
import Create from '../pages/admin/Account/Create';

import HomeTable from '../pages/admin/PoolTable/Home';
import UpdateTable from '../pages/admin/PoolTable/Update';
import CreateTable from '../pages/admin/PoolTable/Create';


import ListMemType from '../pages/admin/Member/ListMemType';
import UpdateMemType from '../pages/admin/Member/UpdateMemType';
import DetailMemType from '../pages/admin/Member/DetailMemType';
import CreateMemberType from '../pages/admin/Member/CreateMemType';
import CreateMemberCard from '../pages/admin/Member/CreateMemCard';
import UpdateMemberCard from '../pages/admin/Member/ UpdateMemCard';

import CreateCategory from '../pages/admin/Category/CreateCategory';
import ListCategory from '../pages/admin/Category/ListCategory';
import DetailCategory from '../pages/admin/Category/DetailCategory';
import CreateProduct from '../pages/admin/Category/CreateProduct';

import Homepage from '../pages/admin/Login/Home';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import RoleProtected, {
  RoleName,
} from '../components/RoleProtected/RoleProtected';

const router = createBrowserRouter([
  {
    path: '/login',
    element: < Login />,
  },
  {
    path: '/home',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
    ],
  },
  {
    path: '/account',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'detail/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Detail /></RoleProtected>,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Update /></RoleProtected>,
      },
      {
        path: 'createAcc',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Create /></RoleProtected>,
      },
    ],
  },

  {
    path: '/pooltable',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <HomeTable />,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><UpdateTable /></RoleProtected>,
      },
      {
        path: 'createTable',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><CreateTable /></RoleProtected>,
      },
    ],
  },


  {
    path: '/membership',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <ListMemType />,
      },
      {
        path: 'detailmemtype/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><DetailMemType /></RoleProtected>,
      },
      {
        path: 'updatememType/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><UpdateMemType /></RoleProtected>,
      },
      {
        path: 'createMemberType',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><CreateMemberType /></RoleProtected>,
      },
      {
        path: 'createMemberCard/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><CreateMemberCard /></RoleProtected>,
      },
      {
        path: 'updatememCard/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><UpdateMemberCard /></RoleProtected>,
      },
      
    ],
  },

  {
    path: '/category',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <ListCategory />,
      },
 
      {
        path: 'createCategory',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><CreateCategory /></RoleProtected>,
      },
      {
        path: 'createProduct/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><CreateProduct /></RoleProtected>,
      },
      {
        path: 'updatememCard/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><UpdateMemberCard /></RoleProtected>,
      },
      {
        path: 'detailCategory/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><DetailCategory /></RoleProtected>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
