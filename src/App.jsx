import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/profile.jsx";
import EditProfile from "./component/EditProfile.jsx";
import AppLayout from "./component/AppLayout.jsx";
import Customer from "./pages/Customer.jsx";
import Vendor from "./pages/Vendor.jsx";
import Products from "./pages/Products.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/login-page" element={<LoginPage />} /> */}
      {/* <Route path="/otp-login" element={<OtpLogin/>}/> */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
      <Route path="/loginpage" element={<LoginPage />}></Route>
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} /> */}

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/customer" element={<Customer />} />
        <Route path="/vendors" element={<Vendor />} />
        <Route path="/products" element={<Products />} />
      </Route>


    </Routes>


  );
}

export default App;