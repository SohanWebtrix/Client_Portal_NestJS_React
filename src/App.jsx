import {BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import Dashboard from "./component/Dashboard.jsx";

function App() {
  return (
<Routes>
  <Route path="/" element={<LoginPage />} />
  {/* <Route path="/login-page" element={<LoginPage />} /> */}
  {/* <Route path="/otp-login" element={<OtpLogin/>}/> */}
  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route path="/dashboard" element={<Dashboard/>}></Route>
  <Route path="/loginpage" element={<LoginPage/>}></Route>

</Routes>

   
  );
}

export default App;