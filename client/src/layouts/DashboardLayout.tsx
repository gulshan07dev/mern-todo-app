import { FC } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout: FC = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-grow pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
