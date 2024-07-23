// src/app/shared/components/Layout.tsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuPage from "./MenuPage";

const Layout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = React.useState<string>("/");

  useEffect(() => {
    setCurrentRoute(window.location.pathname);
  }, []);

  return (
    <>
      {!["/", "/login"].includes(currentRoute) && <MenuPage />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
