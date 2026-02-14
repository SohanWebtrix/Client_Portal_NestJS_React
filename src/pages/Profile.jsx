import React, { useEffect, useState } from "react";
import { Eye, EyeOff,Camera } from "lucide-react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { LOCAL_FORM_API } from "../config/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {

//     const {user, setUser, offline}= useAuth()
//   const navigate = useNavigate();
  
  
//   // Fetch profile on component mount
//   useEffect(() => {
//     fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`)
//       .then(async (res) => {
//         if (!res.ok) {
//           navigate("/");
//           return;
//         }
//         const data = await res.json();
//         setUser(data.user || data);
//       })
//       .catch(() => {
//         navigate("/");
//       });
//   }, []);


    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });


    const passwordRules = {
        length: passwords.new.length >= 8,
        upper: /[A-Z]/.test(passwords.new),
        lower: /[a-z]/.test(passwords.new),
        number: /\d/.test(passwords.new),
        special: /[^A-Za-z0-9]/.test(passwords.new),
    };

    const passedRules = Object.values(passwordRules).filter(Boolean).length;

    const strengthPercent = (passedRules / 5) * 100;

    const strengthLabel =
        passedRules <= 2 ? "Weak" : passedRules <= 4 ? "Medium" : "Strong";

    const strengthColor =
        passedRules <= 2
            ? "bg-red-400"
            : passedRules <= 4
                ? "bg-yellow-400"
                : "bg-green-500";


    const isPasswordDisabled =
        !passwords.current ||
        !passwords.new ||
        !passwords.confirm ||
        passwords.new !== passwords.confirm||
    passedRules < 5;


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* ================= PROFILE INFO ================= */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                <div className="border-b border-gray-300 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Profile Information
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Update your personal information and profile picture
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Avatar */}
                  {/* Avatar */}
<div className="flex justify-center">
    <label className="relative w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center 
        border-4 border-white shadow overflow-hidden cursor-pointer group">

        {/* Default User Icon */}
        <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
            />
        </svg>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 
            group-hover:opacity-100 transition flex items-center justify-center">
            <Camera className="text-white w-6 h-6" />
        </div>

        {/* Hidden File Input */}
        <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    console.log("Selected image:", file);
                    // later: upload / preview logic here
                }
            }}
        />
    </label>
</div>


                    {/* Form */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Full Name" defaultValue="sohan" />
                        <Input label="Date of Birth" placeholder="Select Date" />

                        <Input label="Mobile Number" defaultValue="+91 80804-49810" />
                        <Input
                            label="WhatsApp (Optional)"
                            defaultValue="+91 80804-49810"
                        />

                        <Select label="Timezone" defaultValue="Asia/Kolkata" />
                        <Input label="Location" placeholder="" />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* ================= SECURITY ================= */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage your password, devices, and authentication options
                    </p>
                </div>
                {/* Password Management */}
                <div className="border border-gray-300 rounded-lg p-4 mb-6 mt-6">
                    <h5 className="text-sm font-semibold text-gray-800 mb-4">
                        Password Management
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* LEFT SIDE — PASSWORD INPUTS */}
                        <div className="space-y-4 max-w-md">
                            <PasswordInput
                                placeholder="Current Password"
                                value={passwords.current}
                                visible={showPassword.current}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, current: e.target.value })
                                }
                                toggle={() =>
                                    setShowPassword((s) => ({ ...s, current: !s.current }))
                                }
                            />

                            <PasswordInput
                                placeholder="New Password"
                                value={passwords.new}
                                visible={showPassword.new}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, new: e.target.value })
                                }
                                toggle={() =>
                                    setShowPassword((s) => ({ ...s, new: !s.new }))
                                }
                            />

                            <PasswordInput
                                placeholder="Confirm New Password"
                                value={passwords.confirm}
                                visible={showPassword.confirm}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, confirm: e.target.value })
                                }
                                toggle={() =>
                                    setShowPassword((s) => ({ ...s, confirm: !s.confirm }))
                                }
                            />

                            {passwords.confirm && passwords.new !== passwords.confirm && (
                                <p className="text-xs text-red-500">
                                    Passwords do not match
                                </p>
                            )}

                            <button
                                disabled={isPasswordDisabled}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition
        ${isPasswordDisabled
                                        ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                    }
      `}
                            >
                                Update Password
                            </button>
                        </div>

                        {/* RIGHT SIDE — PASSWORD STRENGTH */}
                        <div className="space-y-4">
                            {passwords.new ? (
                                <>
                                    {/* Progress Bar */}
                                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${strengthColor}`}
                                            style={{ width: `${strengthPercent}%` }}
                                        />
                                    </div>

                                    <p className="text-xs text-gray-700">
                                        Password strength:{" "}
                                        <span className="font-medium">{strengthLabel}</span>
                                    </p>

                                    <ul className="text-xs space-y-1">
                                        <Rule label="At least 8 characters" valid={passwordRules.length} />
                                        <Rule label="One uppercase letter" valid={passwordRules.upper} />
                                        <Rule label="One lowercase letter" valid={passwordRules.lower} />
                                        <Rule label="One number" valid={passwordRules.number} />
                                        <Rule
                                            label="One special character"
                                            valid={passwordRules.special}
                                        />
                                    </ul>
                                </>
                            ) : (
                                <p className="">
                                </p>
                            )}
                        </div>
                    </div>


                    <div>


                    </div>
                </div>

                {/* Logout */}
                <button className="w-full border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    Logout from All Devices
                </button>
            </div>
        </div>
    );
};

export default Profile;

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full rounded-md bg-gray-100 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const Select = ({ label, defaultValue }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <select
            defaultValue={defaultValue}
            className="w-full rounded-md bg-gray-100 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
        </select>
    </div>
);

const PasswordInput = ({ placeholder, visible, toggle, value, onChange }) => (

    <div className="relative">
        <input
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-md bg-gray-100 border border-gray-200 px-3 py-2 pr-10 text-sm focus:outline-none"
        />
        <button
            type="button"
            onClick={toggle}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
        >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
    </div>
);


const Rule = ({ label, valid }) => (
    <li className={`flex items-center gap-2 ${valid ? "text-green-600" : "text-gray-500"}`}>
        <span className="text-lg leading-none">•</span>
        {label}
    </li>
);
