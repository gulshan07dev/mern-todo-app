import { FC } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout: FC = () => {
  return (
    <div className="flex-grow">
      <Navbar />
      <div className="flex w-full min-h-full">
        <Sidebar />
        <main className="flex-grow pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
