import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { LOCAL_FORM_API } from "../config/config";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    aadhaar: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.user.name || "",
          email: data.user.email || "",
          aadhaar: data.user.adhar_number || "",
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        navigate("/profile");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Server error, please try again.");
    } finally {
      setSaving(false);
    }
  };

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

  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dark header bar – more compact on mobile */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-base sm:text-lg font-semibold">Webtrix Solutions</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-base sm:text-lg">Profile Overview</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm text-slate-300 hidden sm:block">
            Last login: Feb 10, 2026
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs sm:text-sm">{initials}</span>
          </div>
        
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 relative bg-slate-200">
        {/* Cover area – smaller height on mobile */}
        <div
          className="h-30 sm:h-64 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 text-white mb-24">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl sm:text-3xl">{initials}</span>
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{form.name || "Your Name"}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* White card – better padding & max-width */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10 pb-3">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-slate-100">
            <div className="flex justify-end mb-5 sm:mb-6">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-5 sm:px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-50 flex items-center gap-2 text-sm sm:text-base"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1">Personal Details</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">Update your personal information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Email ID
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                  placeholder="Enter email"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Aadhaar Number
                </label>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                  placeholder="Enter Aadhaar number"
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex justify-end">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 sm:px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;