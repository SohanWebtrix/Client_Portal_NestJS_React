import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_FORM_API } from "../config/config";
import { fetchWithAuth } from "../api/fetchWithAuth";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`)
      .then(async (res) => {
        if (!res.ok) {
          navigate("/");
          return;
        }
        const data = await res.json();
        setUser(data.user || data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
          <p className="text-slate-400 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dark header bar */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-base sm:text-lg font-semibold">Webtrix Solutions</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-base sm:text-lg">Profile Overview</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm text-slate-300 hidden sm:block">
            Last login: Feb 10, 2026 {/* ← make dynamic later if you have this info */}
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs sm:text-sm">{initials}</span>
          </div>
         
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 relative bg-slate-200">
        {/* Cover / hero area */}
        <div
          className="h-48 sm:h-64 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 text-white mb-24">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl sm:text-3xl">{initials}</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{user?.name || "Your Name"}</h1>
                <span className="inline-block mt-1.5 text-xs sm:text-sm font-medium text-blue-200 bg-blue-900/40 px-2.5 py-0.5 rounded-full">
                  Member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* White card with details */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-slate-100">
            <div className="flex justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1">Personal Details</h2>
            <button
                onClick={() => navigate("/edit-profile")}
                className="px-5 sm:px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Profile
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
              Your account information
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <ProfileItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
                label="Full Name"
                value={user?.name || "—"}
              />

              <ProfileItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
                label="Email Address"
                value={user?.email || "—"}
              />

              <div className="sm:col-span-2">
                <ProfileItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  }
                  label="Aadhaar Number"
                  value={
                    user?.adhar_number
                      ? "•••• •••• " + String(user.adhar_number).replace(/\s/g, "").slice(-4)
                      : "—"
                  }
                />
              </div>
            </div>

            {/* Edit button */}
            <div className="mt-8 sm:mt-10 flex justify-end">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 sm:px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg 
             cursor-pointer hover:bg-slate-100 hover:border-slate-400 
             transition text-sm sm:text-base"
              >
                Back
              </button>


              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm sm:text-base font-semibold text-slate-800 truncate">{value || "—"}</p>
      </div>
    </div>
  );
};

export default Profile;