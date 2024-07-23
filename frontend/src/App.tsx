// src/App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/home/pages/HomePage";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import FormNewRoomPage from "./app/home/pages/CreateRoomPage/CreateRoomPage";
import ListRoomPage from "./app/home/pages/ListRoomPage/ListRoomPage";
import RoomDetailsPage from "./app/home/pages/RoomDetailsPage/RoomDetailsPage";

import AddUserPage from "./app/home/pages/User/AddUserPage";
import UpdateUserPage from "./app/home/pages/User/UpdateUserPage";
import DeleteUserPage from "./app/home/pages/User/DeleteUserPage";
import EquipmentManagerPage from "./app/home/pages/Equipment/EquipmentManagerPage";
import ReservationManagerPage from "./app/home/pages/Reservations/ReservationManagerPage";
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
      { path: "/reservations", element: <ReservationManagerPage />},
      { path: "/admin/reservations", element: <ReservationsManagementPage /> },
      {
        path: "/admin/new-room",
        element: <FormNewRoomPage />,
      },
      {
        path: "/admin/rooms",
        element: <ListRoomPage />,
      },
      {
        path: "/admin/rooms/:id",
        element: <RoomDetailsPage />,
      },
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
