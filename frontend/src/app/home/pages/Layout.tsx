// src/app/shared/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import MenuPage from "./MenuPage";

const Layout: React.FC = () => {
  return (
    <>
      <MenuPage />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
