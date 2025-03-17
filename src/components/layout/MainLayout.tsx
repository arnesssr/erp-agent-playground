import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

interface MainLayoutProps {
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <SideNav />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
