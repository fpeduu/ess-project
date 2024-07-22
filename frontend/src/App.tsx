import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import FormNewRoomPage from "./app/home/pages/CreateRoomPage/CreateRoomPage";
import ListRoomPage from "./app/home/pages/ListRoomPage/ListRoomPage";
import RoomDetailsPage from "./app/home/pages/RoomDetailsPage/RoomDetailsPage";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/new-room",
    Component: FormNewRoomPage,
  },
  {
    path: "/rooms",
    Component: ListRoomPage,
  },
  {
    path: "/rooms/:id",
    Component: RoomDetailsPage,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
