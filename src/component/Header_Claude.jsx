import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, ExternalLink, LogOut, Menu, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { logoutAPI } from '../api/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header_Claude = ({ setIsSidebarOpen }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata');
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const timezoneRef = useRef(null);
    const profileRef = useRef(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
      const navigate = useNavigate();


    const{user}=useAuth();

      const getInitials = (name = "") =>
    name.split(" ").map(n => n[0]).join("").toUpperCase();

    const timezones = [
        { value: 'Asia/Kolkata', label: 'Asia/Kolkata', offset: '+5:30' },
        { value: 'America/New_York', label: 'America/New York', offset: '-5:00' },
        { value: 'Europe/London', label: 'Europe/London', offset: '+0:00' },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (timezoneRef.current && !timezoneRef.current.contains(event.target)) {
                setIsTimezoneOpen(false);
            }

            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatTime = (date, timezone) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone,
        });
    };

    const formatDate = (date, timezone) => {
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: timezone,
        });
    };


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
        <header className="bg-[#2d385b] sticky top-0 z-40">
            <div className="flex items-center justify-between">
                {/* Left side - Menu Toggle and Logo */}
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>

                    {/* Webtrix Logo */}
                    <div className="flex items-left gap-2"><div className="w-16 h-8 rounded-md flex items-center justify-center text-indigo-700 text-lg"><div className="align-center flex item-left justify-start pt-1"><a href="/"><svg className="w-8 h-8 mt-2" viewBox="0 0 142 137"><defs><clipPath id="logoClip"><path d="M101.435 0.77224C97.6358 5.05397 93.9107 12.3256 92.9421 17.4932C92.6814 18.822 92.6814 25.503 92.905 27.0902C93.4637 30.8184 96.183 39.0127 98.5298 44.0694C98.8279 44.6602 99.6473 46.5795 100.355 48.2773C101.734 51.5257 105.198 57.3947 110.45 65.4783C124.196 86.5547 129.597 97.3328 131.534 107.299C132.093 110.289 131.758 116.342 130.827 119.923C130.007 122.95 129.001 126.013 128.48 127.01C127.623 128.56 128.629 127.453 130.193 125.054C135.856 116.49 138.202 109.698 138.202 101.91C138.202 95.3027 137.308 91.6485 133.62 83.0112C130.938 76.81 129.337 73.4512 127.362 70.0184L125.5 66.8071L127.586 61.5287C128.74 58.6127 130.938 53.076 132.428 49.2371C133.956 45.3614 136.526 38.8649 138.128 34.7309L141.071 27.2747H128.145H115.218L112.424 34.9155C110.86 39.1234 109.445 42.6299 109.258 42.667C108.848 42.8145 104.974 36.4658 102.516 31.6671C96.2201 19.3018 95.9595 10.4431 101.696 1.25209C102.628 -0.224371 102.516 -0.408928 101.435 0.77224Z"></path><path d="M76.8866 13.3577C72.8263 18.3039 70.8147 21.9581 69.5108 26.8304C68.7657 29.5989 67.2758 32.5516 59.4158 46.6888C54.3495 55.8059 48.7246 65.8827 46.9737 69.0572C45.2231 72.2317 43.6586 74.7415 43.5094 74.5939C43.3976 74.4464 41.7587 70.2753 39.8961 65.2922C38.0334 60.3092 34.1221 49.7526 31.1421 41.8533L25.7779 27.4579L12.8889 27.3472C5.8112 27.3103 0 27.3472 0 27.421C0 27.5318 0.93128 29.9679 2.08607 32.8838C3.24086 35.8 8.19527 48.4606 13.1124 61.0475C18.0296 73.6342 25.5544 92.902 29.8754 103.865C34.1595 114.827 38.1826 125.163 38.8157 126.861C39.7472 129.334 40.0824 129.851 40.4177 129.444C41.4606 128.337 65.9347 85.4091 67.9834 81.0905C69.2127 78.5065 70.3303 76.3657 70.4795 76.3657C70.5912 76.3657 71.8948 78.4697 73.3105 81.0534C74.7261 83.6742 81.4685 95.7074 88.2109 107.851L100.504 129.924L99.6472 132.434C99.1627 133.837 98.604 135.313 98.3805 135.756C98.0826 136.273 98.0826 136.531 98.3433 136.531C98.9767 136.531 102.292 131.77 104.266 128.042C107.023 122.8 108.066 118.925 108.289 112.982C108.438 109.955 108.327 107.002 108.029 105.231C107.284 100.358 101.771 85.1876 98.8275 79.7617C95.2142 73.0805 88.9188 62.1548 87.019 59.2757C84.3369 55.2154 80.3509 47.6486 77.8552 41.8904C72.5282 29.5989 72.6399 20.6662 78.2648 12.2135C79.4569 10.4048 78.9727 10.8108 76.8866 13.3577Z"></path></clipPath></defs><g fill="#fff"><path d="M101.435 0.77224C97.6358 5.05397 93.9107 12.3256 92.9421 17.4932C92.6814 18.822 92.6814 25.503 92.905 27.0902C93.4637 30.8184 96.183 39.0127 98.5298 44.0694C98.8279 44.6602 99.6473 46.5795 100.355 48.2773C101.734 51.5257 105.198 57.3947 110.45 65.4783C124.196 86.5547 129.597 97.3328 131.534 107.299C132.093 110.289 131.758 116.342 130.827 119.923C130.007 122.95 129.001 126.013 128.48 127.01C127.623 128.56 128.629 127.453 130.193 125.054C135.856 116.49 138.202 109.698 138.202 101.91C138.202 95.3027 137.308 91.6485 133.62 83.0112C130.938 76.81 129.337 73.4512 127.362 70.0184L125.5 66.8071L127.586 61.5287C128.74 58.6127 130.938 53.076 132.428 49.2371C133.956 45.3614 136.526 38.8649 138.128 34.7309L141.071 27.2747H128.145H115.218L112.424 34.9155C110.86 39.1234 109.445 42.6299 109.258 42.667C108.848 42.8145 104.974 36.4658 102.516 31.6671C96.2201 19.3018 95.9595 10.4431 101.696 1.25209C102.628 -0.224371 102.516 -0.408928 101.435 0.77224Z"></path><path d="M76.8866 13.3577C72.8263 18.3039 70.8147 21.9581 69.5108 26.8304C68.7657 29.5989 67.2758 32.5516 59.4158 46.6888C54.3495 55.8059 48.7246 65.8827 46.9737 69.0572C45.2231 72.2317 43.6586 74.7415 43.5094 74.5939C43.3976 74.4464 41.7587 70.2753 39.8961 65.2922C38.0334 60.3092 34.1221 49.7526 31.1421 41.8533L25.7779 27.4579L12.8889 27.3472C5.8112 27.3103 0 27.3472 0 27.421C0 27.5318 0.93128 29.9679 2.08607 32.8838C3.24086 35.8 8.19527 48.4606 13.1124 61.0475C18.0296 73.6342 25.5544 92.902 29.8754 103.865C34.1595 114.827 38.1826 125.163 38.8157 126.861C39.7472 129.334 40.0824 129.851 40.4177 129.444C41.4606 128.337 65.9347 85.4091 67.9834 81.0905C69.2127 78.5065 70.3303 76.3657 70.4795 76.3657C70.5912 76.3657 71.8948 78.4697 73.3105 81.0534C74.7261 83.6742 81.4685 95.7074 88.2109 107.851L100.504 129.924L99.6472 132.434C99.1627 133.837 98.604 135.313 98.3805 135.756C98.0826 136.273 98.0826 136.531 98.3433 136.531C98.9767 136.531 102.292 131.77 104.266 128.042C107.023 122.8 108.066 118.925 108.289 112.982C108.438 109.955 108.327 107.002 108.029 105.231C107.284 100.358 101.771 85.1876 98.8275 79.7617C95.2142 73.0805 88.9188 62.1548 87.019 59.2757C84.3369 55.2154 80.3509 47.6486 77.8552 41.8904C72.5282 29.5989 72.6399 20.6662 78.2648 12.2135C79.4569 10.4048 78.9727 10.8108 76.8866 13.3577Z"></path></g><foreignObject width="142" height="137" clipPath="url(#logoClip)"><div className="shine-effect"></div></foreignObject><foreignObject width="142" height="137" clipPath="url(#logoClip)"><div className="shine-effect w-full h-full"></div></foreignObject></svg></a></div></div></div>
                </div>

                {/* Right side - Time, Timezone, Notification, Profile */}
                <div className="flex items-center gap-5">
                    {/* Time and Timezone Dropdown */}
                    <div className="hidden md:flex items-center gap-4 pr-5 border-r border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-clock w-4 h-4 text-indigo-500" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>

                        <div className="text-sm font-medium text-gray-100">
                            {formatDate(currentTime, selectedTimezone)}, {formatTime(currentTime, selectedTimezone)}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-globe w-4 h-4 text-green-600 bg-transparent" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                        {/* Timezone Dropdown */}
                        <div className="relative" ref={timezoneRef}>
                            <button
                                onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                className="flex items-center gap-1 text-sm text-gray-100 transition-colors"
                            >
                                <span>{selectedTimezone.split('/')[1]}</span>
                                <ChevronDown size={14} className={`transition-transform ${isTimezoneOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isTimezoneOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                                    {timezones.map((tz) => (
                                        <button
                                            key={tz.value}
                                            onClick={() => {
                                                setSelectedTimezone(tz.value);
                                                setIsTimezoneOpen(false);
                                            }}
                                            className={`
                        w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors
                        ${selectedTimezone === tz.value ? 'bg-purple-50 text-purple-700' : 'text-gray-700'}
                      `}
                                        >
                                            <div className="font-medium">{tz.label}</div>
                                            <div className="text-xs text-gray-500">UTC {tz.offset}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notification Bell */}
                    <div className="relative cursor-pointer md:block">
                        <div className="relative flex items-center justify-center">
                            <span className="absolute inset-0 "></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bell relative z-10 w-5 h-5 text-gray-100" aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="relative mr-[20px]" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2  px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                            <div className="w-9 h-9 bg-[rgb(242,252,232)]  rounded-full flex items-center justify-center">
                                <span className="text-[rgb(51,51,51)] text-sm">{getInitials(user?.name)}</span>
                            </div>
                            <ChevronDown size={16} className={`text-gray-100 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                                {/* User Info Section */}
                                <div className="">
                                    <div className="flex items-center gap-3 border-b border-gray-300 p-4">
                                        <div className=" bg-[rgb(242,252,232)] rounded-full flex items-center justify-center">
                                            <span className="text-[rgb(51,51,51)] text-sm">{getInitials(user?.name)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{user?.name}</div>
                                            <div className="text-sm text-gray-600">{user?.email}</div>
                                        </div>
                                    </div>

                                    {/* Feature Request Banner */}
                                    <div className="bg-gray-50 px-4 py-3 text-sm text-gray-700 border-b border-gray-300">
                                        <p className="mb-1 leading-snug">Missing out on a feature? We'd love to know!</p>
                                        <a href="https://www.webtrix24.com" className="text-indigo-600 font-medium hover:underline">Request a Feature ↗</a>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2 px-4">
                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm cursor-pointer" onClick={()=> navigate("/profile")}>
                                        <Settings size={18} className="text-gray-600"  />
                                        <span className="text-gray-700">User Settings</span>
                                    </button>

                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm cursor-pointer" onClick={handleLogout}>
                                        <LogOut size={18} className="text-red-600" />
                                        <span className="text-red-600">Logout</span>
                                    </button>
                                </div>

                                {/* Footer Links */}
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                                    <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                                        <a href="#" className="hover:text-gray-900 transition-colors">Blog</a>
                                        <span>•</span>
                                        <a href="#" className="hover:text-gray-900 transition-colors">About</a>
                                        <span>•</span>
                                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                                        <span>•</span>
                                        <a href="#" className="hover:text-gray-900 transition-colors">FAQs</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header_Claude;
