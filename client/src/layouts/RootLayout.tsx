import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

const RootLayout: FC = () => {
  return (
    <main className="w-full min-h-screen bg-background flex font-inter">
      <Toaster />
      <Outlet />
    </main>
  );
};

export default RootLayout;
