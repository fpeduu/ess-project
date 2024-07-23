import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './app/home/pages/HomePage';
import CreateTest from './app/home/pages/CreateTest';
import ListTests from './app/home/pages/ListTests';
import AddUserPage from './app/home/pages/User/AddUserPage';
import UpdateUserPage from './app/home/pages/User/UpdateUserPage';
import DeleteUserPage from './app/home/pages/User/DeleteUserPage';
import MenuPage from './app/home/pages/MenuPage';
const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/create-test',
    Component: CreateTest,
  },
  {
    path: '/tests',
    Component: ListTests,
  },
  {
    path: '/users',
    Component: AddUserPage,
  },
  {
    path: '/update',
    Component: UpdateUserPage,
  },
  {
    path: '/delete',
    Component: DeleteUserPage,
  },

  {
    path: '/menu',
    Component: MenuPage,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
