import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../api/allApi";
import { toast } from "react-toastify";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 👇 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Logout logic
  const handleLogout = async() => {
   try {
             const res = await logoutAPI()
             const data = await res.json()
 
             if (!res.ok) {
                 toast.error(data.message || "Fail to Logout User")
                 return
             }
             toast.success("✅ User Logged Out succesfully");
 
             navigate("/")
 
         } catch (err) {
             console.error(err);
             toast.error("❌ Something went wrong");
         }
  };

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Left side */}
      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* Right side */}
      <div className="relative" ref={dropdownRef}>
        {/* Profile Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
        >
          <span className="text-lg font-bold text-gray-700">
            U
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/edit-profile")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
