// src/App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/home/pages/HomePage";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import AddUserPage from "./app/home/pages/User/AddUserPage";
import UpdateUserPage from "./app/home/pages/User/UpdateUserPage";
import DeleteUserPage from "./app/home/pages/User/DeleteUserPage";
import EquipmentManagerPage from "./app/home/pages/Equipment/EquipmentManagerPage";
import ReservationsManagementPage from "./app/home/pages/ReservationsAdmin/ReservationsPage";
import Layout from "./app/home/pages/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/create-test", element: <CreateTest /> },
      { path: "/tests", element: <ListTests /> },
      { path: "/users", element: <AddUserPage /> },
      { path: "/users/:userId/update", element: <UpdateUserPage /> },
      { path: "/users/delete/:userId", element: <DeleteUserPage /> },
      { path: "/equipment", element: <EquipmentManagerPage /> },
      { path: "/admin/reservations", element: <ReservationsManagementPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
    </>
  );
};

export default App;
