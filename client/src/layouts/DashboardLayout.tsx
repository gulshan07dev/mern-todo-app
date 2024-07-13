import { FC } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout: FC = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow min-h-full pb-20 md:pb-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
