import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header_Claude from "./Header_Claude";
import Sidebar_Claude from "./Sidebar_Claude";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (always visible) */}
      <Header_Claude setIsSidebarOpen={setIsSidebarOpen} />

      {/* Sidebar (always visible) */}
      <Sidebar_Claude
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content changes */}
      <div className="lg:ml-20 pt-16">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
