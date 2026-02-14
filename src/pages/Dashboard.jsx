import {  useState, useEffect } from "react";
import Offline from "../component/Offline";
import Header from "../component/Header";
import Header_Claude from "../component/Header_Claude";
import Sidebar_Claude from "../component/Sidebar_Claude";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { LOCAL_FORM_API } from "../config/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const {user, setUser, offline}= useAuth()
  const navigate = useNavigate();
  
  
  // Fetch profile on component mount
  useEffect(() => {
    fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`)
      .then(async (res) => {
        if (!res.ok) {
          navigate("/");
          return;
        }
        const data = await res.json();
        setUser(data.user || data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  if (offline) {
    return <Offline />; // 👈 SHOW OFFLINE UI
  }

  return (
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-10 animate-fade-in">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  Good Afternoon, {user?.name} 👋
                </h1>
                <p className="text-lg text-gray-700 mb-1">
                  Welcome back to your rental management dashboard
                </p>
                <p className="text-gray-600">Ready to streamline your operations today?</p>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-slide-up">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4">
                    📦
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Asset</h3>
                  <p className="text-sm text-gray-600">
                    Register new equipment with serial/IMEI, HSN, and GST settings.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-2xl mb-4">
                    🚚
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Create a new rental agreement and assign assets to the customer.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-2xl mb-4">
                    📄
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Invoice</h3>
                  <p className="text-sm text-gray-600">
                    Generate invoices with taxes, discounts, and part payments.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up-delay">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Total Assets
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">245</div>
                  <div className="text-sm text-green-600">+12% this month</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Active Rentals
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">89</div>
                  <div className="text-sm text-green-600">+5% this week</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Revenue
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹4.2L</div>
                  <div className="text-sm text-green-600">+18% this month</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Pending Returns
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
                  <div className="text-sm text-gray-600">Due this week</div>
                </div>
              </div>
            </div>
    

  
     
   
  );
};

export default Dashboard;
