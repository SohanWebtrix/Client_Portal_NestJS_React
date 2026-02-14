import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Package, TrendingUp } from "lucide-react";

const Sidebar_Claude = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/customer", label: "Customers", icon: Users },
    { to: "/vendors", label: "Vendors", icon: Package },
    { to: "/products", label: "Products", icon: TrendingUp },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-6 left-0 h-full bg-[linear-gradient(#2d385b,#1a1c1e)]
          z-30 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-20 flex flex-col items-center py-6
        `}
      >
        <nav className="flex flex-col items-center gap-2 w-full px-2 mt-4">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `
                relative w-full flex flex-col items-center justify-center py-2
                rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white/15 ring-1 ring-white/10"
                    : "hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/10 hover:shadow-inner"
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={`
                      transition-colors duration-200
                      ${
                        isActive
                          ? "text-amber-400"
                          : "text-gray-400 group-hover:text-amber-400"
                      }
                    `}
                  />
                  <span
                    className={`
                      text-[11px] mt-1 text-center transition-colors
                      ${
                        isActive
                          ? "text-amber-400"
                          : "text-white/80 group-hover:text-amber-400"
                      }
                    `}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar_Claude;
